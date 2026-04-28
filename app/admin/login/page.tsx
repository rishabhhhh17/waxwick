'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [pwd, setPwd] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErr('Wrong password.');
      } else {
        router.push('/admin');
      }
    } catch {
      setErr('Login failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white border border-cream-200 rounded-xl2 p-8">
        <h1 className="font-display text-3xl text-ink">Admin sign-in</h1>
        <p className="text-[13px] text-clay-700 mt-1.5">Wic &amp; Whisper orders dashboard.</p>
        <label className="block mt-6">
          <span className="text-[12px] uppercase tracking-[0.18em] text-clay-700">Password</span>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="mt-1.5 w-full bg-cream-50 border border-cream-200 rounded-md px-3.5 py-3 text-ink focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500"
            autoFocus
            required
          />
        </label>
        {err && <div className="mt-3 text-[13px] text-error">{err}</div>}
        <button type="submit" disabled={busy} className="btn-primary w-full mt-6">
          {busy ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in…</> : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
