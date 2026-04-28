import Razorpay from 'razorpay';

let instance: Razorpay | null = null;
export function razorpay() {
  if (instance) return instance;
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new Error('RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set');
  }
  instance = new Razorpay({ key_id, key_secret });
  return instance;
}

export async function verifyOrderSignature(opts: {
  order_id: string;
  payment_id: string;
  signature: string;
}) {
  const { createHmac, timingSafeEqual } = await import('crypto');
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error('RAZORPAY_KEY_SECRET not set');
  const expected = createHmac('sha256', secret)
    .update(`${opts.order_id}|${opts.payment_id}`)
    .digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(opts.signature);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function verifyWebhookSignature(rawBody: string, signature: string) {
  const { createHmac, timingSafeEqual } = await import('crypto');
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) throw new Error('RAZORPAY_WEBHOOK_SECRET not set');
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
