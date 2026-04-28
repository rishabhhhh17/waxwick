import { createHash } from 'crypto';

const sha256 = (s: string) => createHash('sha256').update(s.trim().toLowerCase()).digest('hex');

type ServerPurchaseInput = {
  event_id: string;
  event_time?: number;
  email?: string;
  phone?: string;
  value_inr: number;
  currency?: string;
  content_ids: string[];
  num_items: number;
  client_ip?: string;
  client_user_agent?: string;
  source_url?: string;
};

export async function fireServerPurchase(input: ServerPurchaseInput) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_ACCESS_TOKEN;
  if (!pixelId || !token) {
    console.warn('[meta] CAPI not configured, skipping server purchase event');
    return { ok: false, reason: 'not_configured' };
  }

  const user_data: Record<string, string | string[]> = {};
  if (input.email) user_data.em = sha256(input.email);
  if (input.phone) user_data.ph = sha256(input.phone.replace(/\D/g, ''));
  if (input.client_ip) user_data.client_ip_address = input.client_ip;
  if (input.client_user_agent) user_data.client_user_agent = input.client_user_agent;

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: 'Purchase',
        event_time: input.event_time ?? Math.floor(Date.now() / 1000),
        event_id: input.event_id,
        action_source: 'website',
        event_source_url: input.source_url,
        user_data,
        custom_data: {
          currency: input.currency ?? 'INR',
          value: input.value_inr,
          content_ids: input.content_ids,
          content_type: 'product',
          num_items: input.num_items,
        },
      },
    ],
  };

  const test = process.env.META_TEST_EVENT_CODE;
  if (test) (body as { test_event_code?: string }).test_event_code = test;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[meta] CAPI error', res.status, j);
      return { ok: false, status: res.status, body: j };
    }
    return { ok: true, body: j };
  } catch (e) {
    console.error('[meta] CAPI fetch failed', e);
    return { ok: false, reason: 'fetch_failed' };
  }
}
