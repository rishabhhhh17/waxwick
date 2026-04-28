'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, 'qty'>, qty?: number) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotalPaise: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      open: false,
      lines: [],
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
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((a, l) => a + l.qty, 0),
      subtotalPaise: () =>
        get().lines.reduce((a, l) => a + l.unit_price_paise * l.qty, 0),
    }),
    { name: 'wicwhisper-cart-v1' },
  ),
);
