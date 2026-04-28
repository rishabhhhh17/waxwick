import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE = 'waxwick_admin';

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 24) throw new Error('ADMIN_SESSION_SECRET must be 24+ chars');
  return new TextEncoder().encode(s);
}

export async function signAdminCookie() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secret());
  return token;
}

export function setAdminCookie(token: string) {
  cookies().set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  });
}

export function clearAdminCookie() {
  cookies().delete(COOKIE);
}

export async function verifyAdmin(): Promise<boolean> {
  const c = cookies().get(COOKIE)?.value;
  if (!c) return false;
  try {
    await jwtVerify(c, secret());
    return true;
  } catch {
    return false;
  }
}

export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
