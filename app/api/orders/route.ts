import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { razorpay } from '@/lib/razorpay';
import { getVariantById } from '@/lib/products';
import {
  clampDiscountForMinTotal,
  computeSystemDiscountAmount,
  findSystemDiscountCode,
} from '@/lib/discounts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CartLineIn = { variantId: string; qty: number };

// Free shipping on every order.

export async function POST(req: Request) {
  let body: {
    items?: CartLineIn[];
    customer?: { name?: string; email?: string; phone?: string };
    shipping?: Record<string, unknown>;
    discountCode?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ error: 'empty_cart' }, { status: 400 });
  }
  const customer = body.customer ?? {};
  if (!customer.name || !customer.email || !customer.phone) {
    return NextResponse.json({ error: 'missing_customer' }, { status: 400 });
  }

  // Server-side price the cart — never trust the client.
  let total_paise = 0;
  const line_items: {
    variant_id: string; product_id: string; name: string; variant: string;
    qty: number; unit_paise: number; line_paise: number;
  }[] = [];

  for (const it of items) {
    const qty = Math.max(1, Math.min(20, Number(it.qty) || 0));
    const found = getVariantById(it.variantId);
    if (!found) {
      return NextResponse.json({ error: 'invalid_variant', variantId: it.variantId }, { status: 400 });
    }
    const { product, variant } = found;
    const line = variant.price_paise * qty;
    total_paise += line;
    line_items.push({
      variant_id: variant.id,
      product_id: product.id,
      name: product.name,
      variant: variant.label,
      qty,
      unit_paise: variant.price_paise,
      line_paise: line,
    });
  }

  if (total_paise <= 0) {
    return NextResponse.json({ error: 'invalid_total' }, { status: 400 });
  }

  const subtotal_paise = total_paise;
  const shipping_paise = 0;

  // Re-validate discount server-side — never trust client
  let discount_paise = 0;
  let appliedCode: string | null = null;
  if (body.discountCode) {
    const found = findSystemDiscountCode(body.discountCode);
    if (found && subtotal_paise >= found.minOrderPaise) {
      const raw = computeSystemDiscountAmount(found, subtotal_paise);
      const clamped = clampDiscountForMinTotal(subtotal_paise, raw, shipping_paise);
      discount_paise = clamped.discount;
      appliedCode = found.code;
    }
  }
  const final_total = subtotal_paise - discount_paise + shipping_paise;

  const event_id = randomUUID();
  const receipt = `wax_${Date.now().toString(36)}`;

  try {
    const order = await razorpay().orders.create({
      amount: final_total,
      currency: 'INR',
      receipt,
      notes: {
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
        shipping: JSON.stringify(body.shipping ?? {}),
        items: JSON.stringify(line_items),
        subtotal_paise: String(subtotal_paise),
        shipping_paise: String(shipping_paise),
        discount_code: appliedCode ?? '',
        discount_paise: String(discount_paise),
        event_id,
      },
    });

    return NextResponse.json({
      razorpay_order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      event_id,
    });
  } catch (e) {
    console.error('[orders] create failed', e);
    return NextResponse.json({ error: 'razorpay_error' }, { status: 502 });
  }
}
