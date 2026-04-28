import { NextResponse } from 'next/server';
import { signAdminCookie, setAdminCookie, clearAdminCookie, constantTimeEqual } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return NextResponse.json({ ok: false, error: 'admin_not_configured' }, { status: 500 });
  if (!password || !constantTimeEqual(password, expected)) {
    return NextResponse.json({ ok: false, error: 'bad_password' }, { status: 401 });
  }
  const token = await signAdminCookie();
  setAdminCookie(token);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  clearAdminCookie();
  return NextResponse.json({ ok: true });
}
