'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  clampDiscountForMinTotal,
  computeSystemDiscountAmount,
  findSystemDiscountCode,
} from './discounts';

export type CartLine = {
  variantId: string;
  productId: string;
  slug: string;
  name: string;
  variantLabel: string;
  image: string;
  unit_price_paise: number;
  qty: number;
};

type CartState = {
  open: boolean;
  lines: CartLine[];
  discountCode: string | null;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  clear: () => void;
  applyCode: (code: string) => { ok: true } | { ok: false; error: string };
  removeCode: () => void;
  count: () => number;
  subtotalPaise: () => number;
  discountPaise: (shippingPaise?: number) => number;
  finalTotalPaise: (shippingPaise?: number) => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      open: false,
      lines: [],
      discountCode: null,
      setOpen: (v) => set({ open: v }),
      add: (line, qty = 1) =>
        set((s) => {
          const i = s.lines.findIndex((x) => x.variantId === line.variantId);
          if (i >= 0) {
            const copy = [...s.lines];
            copy[i] = { ...copy[i], qty: copy[i].qty + qty };
            return { lines: copy, open: true };
          }
          return { lines: [...s.lines, { ...line, qty }], open: true };
        }),
      remove: (variantId) =>
        set((s) => ({ lines: s.lines.filter((x) => x.variantId !== variantId) })),
      setQty: (variantId, qty) =>
        set((s) => ({
          lines: s.lines
            .map((x) => (x.variantId === variantId ? { ...x, qty } : x))
            .filter((x) => x.qty > 0),
        })),
      clear: () => set({ lines: [], discountCode: null }),
      applyCode: (code) => {
        const found = findSystemDiscountCode(code);
        if (!found) return { ok: false, error: 'Invalid code.' };
        set({ discountCode: found.code });
        return { ok: true };
      },
      removeCode: () => set({ discountCode: null }),
      count: () => get().lines.reduce((a, l) => a + l.qty, 0),
      subtotalPaise: () =>
        get().lines.reduce((a, l) => a + l.unit_price_paise * l.qty, 0),
      discountPaise: (shippingPaise = 0) => {
        const subtotal = get().subtotalPaise();
        const code = get().discountCode;
        if (!code || subtotal <= 0) return 0;
        const found = findSystemDiscountCode(code);
        if (!found || subtotal < found.minOrderPaise) return 0;
        const raw = computeSystemDiscountAmount(found, subtotal);
        return clampDiscountForMinTotal(subtotal, raw, shippingPaise).discount;
      },
      finalTotalPaise: (shippingPaise = 0) => {
        const subtotal = get().subtotalPaise();
        const discount = get().discountPaise(shippingPaise);
        return Math.max(0, subtotal - discount + shippingPaise);
      },
    }),
    { name: 'wicwhisper-cart-v1' },
  ),
);
