'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, RefreshCw, LogOut } from 'lucide-react';
import { formatINR } from '@/lib/utils';

type Payment = {
  id: string;
  order_id: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  email?: string;
  contact?: string;
  created_at: number;
  notes?: Record<string, string>;
};

export default function AdminClient() {
  const router = useRouter();
  const [items, setItems] = useState<Payment[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch('/api/admin/payments?count=100');
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e) {
      setErr('Could not load payments.');
      console.error(e);
    } finally { setBusy(false); }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  async function signOut() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  const captured = (items ?? []).filter((p) => p.status === 'captured');
  const totalCapturedPaise = captured.reduce((a, p) => a + p.amount, 0);

  return (
    <div className="bg-cream-50 min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-[40px] leading-tight text-ink">Orders</h1>
            <p className="text-[13px] text-clay-700">Read directly from Razorpay. No database.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} disabled={busy} className="btn-outline btn-sm inline-flex">
              {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
              Refresh
            </button>
            <button onClick={signOut} className="btn-ghost btn-sm inline-flex">
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </button>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <Stat k="Captured payments" v={String(captured.length)} />
          <Stat k="Total captured" v={formatINR(totalCapturedPaise)} />
          <Stat k="Total events" v={String(items?.length ?? 0)} />
        </div>

        {err && <div className="mt-6 text-[14px] text-error">{err}</div>}

        <div className="mt-8 bg-white border border-cream-200 rounded-xl2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-cream-100 text-clay-700">
                <tr className="text-left">
                  <Th>Created</Th>
                  <Th>Payment</Th>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Items</Th>
                  <Th>Method</Th>
                  <Th className="text-right">Amount</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {items === null && (
                  <tr><td colSpan={8} className="p-8 text-center text-clay-700">Loading…</td></tr>
                )}
                {items && items.length === 0 && (
                  <tr><td colSpan={8} className="p-8 text-center text-clay-700">No payments yet.</td></tr>
                )}
                {items && items.map((p) => {
                  let lineSummary = '—';
                  if (p.notes?.items) {
                    try {
                      const parsed = JSON.parse(p.notes.items) as Array<{ name: string; qty: number }>;
                      lineSummary = parsed.map((x) => `${x.qty}× ${x.name}`).join(', ');
                    } catch {}
                  }
                  return (
                    <tr key={p.id} className="border-t border-cream-200">
                      <Td>{new Date(p.created_at * 1000).toLocaleString()}</Td>
                      <Td className="font-mono">{p.id}</Td>
                      <Td className="font-mono">{p.order_id}</Td>
                      <Td>
                        <div className="text-ink">{p.notes?.customer_name ?? '—'}</div>
                        <div className="text-clay-700 text-[12px]">{p.email ?? p.notes?.customer_email ?? ''}</div>
                      </Td>
                      <Td className="max-w-[220px] truncate" title={lineSummary}>{lineSummary}</Td>
                      <Td className="capitalize">{p.method}</Td>
                      <Td className="text-right">{formatINR(p.amount)}</Td>
                      <Td>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] uppercase tracking-[0.12em] ${
                          p.status === 'captured' ? 'bg-emerald-50 text-emerald-700' :
                          p.status === 'authorized' ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        }`}>{p.status}</span>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white border border-cream-200 rounded-xl2 p-5">
      <div className="text-[12px] uppercase tracking-[0.18em] text-clay-700">{k}</div>
      <div className="mt-2 font-display text-[28px] text-ink">{v}</div>
    </div>
  );
}
function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-4 py-3 text-[11px] uppercase tracking-[0.14em] font-medium ${className}`}>{children}</th>;
}
function Td({ children, className = '', title }: { children: React.ReactNode; className?: string; title?: string }) {
  return <td title={title} className={`px-4 py-3 text-ink/90 align-top ${className}`}>{children}</td>;
}
