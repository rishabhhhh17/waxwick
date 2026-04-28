'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterForm() {
  const [state, setState] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [email, setEmail] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state !== 'idle') return;
    setState('submitting');
    // No backend yet — fake the request, then mark done.
    // Wire to /api/newsletter (or Klaviyo / Mailchimp) when ready.
    await new Promise((r) => setTimeout(r, 600));
    setState('done');
  };

  if (state === 'done') {
    return (
      <div className="flex items-center gap-3 bg-clay-800/80 border border-ember-200/40 text-cream-50 rounded-full pl-4 pr-5 py-3.5 min-h-[48px]">
        <span className="w-7 h-7 rounded-full bg-ember-200/20 text-ember-200 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4" strokeWidth={2.25} />
        </span>
        <span className="text-[14.5px] text-cream-50/90">
          You&rsquo;re in. The first letter lands soon.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 bg-clay-800/80 border border-cream-100/15 text-cream-50 placeholder:text-cream-100/45 rounded-full px-5 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-ember-200/60 focus:border-ember-200/40 transition-all min-h-[48px]"
      />
      <button
        type="submit"
        disabled={state === 'submitting'}
        className="inline-flex items-center justify-center bg-ember-500 hover:bg-ember-600 disabled:opacity-60 text-white px-7 py-3.5 rounded-full font-medium transition-colors min-h-[48px] whitespace-nowrap"
      >
        {state === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </form>
  );
}
