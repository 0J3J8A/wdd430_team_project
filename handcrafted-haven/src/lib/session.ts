// src/lib/session.ts
// Handles JWT creation, verification, and cookie management.
// Uses the Web Crypto API (built into Node.js 18+) — no extra packages needed.

import { cookies } from 'next/headers';

const SECRET = process.env.AUTH_SECRET || 'handcrafted-haven-secret-key-change-in-production';
const COOKIE_NAME = 'hh_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  provider: 'credentials' | 'google';
};

// ── Encode / decode helpers ─────────────────────────────────────────────────

function base64url(str: string): string {
  return Buffer.from(str).toString('base64url');
}

function fromBase64url(str: string): string {
  return Buffer.from(str, 'base64url').toString('utf-8');
}

async function sign(payload: object): Promise<string> {
  const header  = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body    = base64url(JSON.stringify({ ...payload, exp: Date.now() + SESSION_DURATION }));
  const encoder = new TextEncoder();
  const key     = await crypto.subtle.importKey(
    'raw', encoder.encode(SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig     = await crypto.subtle.sign('HMAC', key, encoder.encode(`${header}.${body}`));
  const sigB64  = Buffer.from(sig).toString('base64url');
  return `${header}.${body}.${sigB64}`;
}

async function verify(token: string): Promise<object | null> {
  try {
    const [header, body, sig] = token.split('.');
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const valid = await crypto.subtle.verify(
      'HMAC', key,
      Buffer.from(sig, 'base64url'),
      encoder.encode(`${header}.${body}`)
    );
    if (!valid) return null;
    const payload = JSON.parse(fromBase64url(body)) as { exp: number };
    if (payload.exp < Date.now()) return null; // expired
    return payload;
  } catch {
    return null;
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

export async function createSession(user: SessionUser): Promise<void> {
  const token = await sign(user);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = await verify(token);
  if (!payload) return null;
  return payload as SessionUser;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}