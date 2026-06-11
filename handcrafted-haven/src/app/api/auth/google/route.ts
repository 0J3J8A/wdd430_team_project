// src/app/api/auth/google/route.ts
//
// Google OAuth 2.0 flow.
//
// ── Setup required ──────────────────────────────────────────────────────────
// 1. Go to https://console.cloud.google.com
// 2. Create a project → APIs & Services → Credentials → OAuth 2.0 Client ID
// 3. Set Authorized redirect URIs to: http://localhost:3000/api/auth/google/callback
// 4. Add to your .env.local:
//      GOOGLE_CLIENT_ID=your-client-id
//      GOOGLE_CLIENT_SECRET=your-client-secret
//      NEXT_PUBLIC_BASE_URL=http://localhost:3000
// ───────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';
import { getUserByEmail, createUser } from '@/lib/auth-users';

const GOOGLE_CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const BASE_URL             = process.env.NEXT_PUBLIC_BASE_URL  || 'http://localhost:3000';
const REDIRECT_URI         = `${BASE_URL}/api/auth/google/callback`;

// ── Step 1: Redirect to Google ──────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // If this is the callback (has ?code=...), handle it
  const code = searchParams.get('code');
  if (code) {
    return handleCallback(code);
  }

  // Otherwise redirect to Google
  if (!GOOGLE_CLIENT_ID) {
    return NextResponse.json(
      { error: 'Google OAuth not configured. Add GOOGLE_CLIENT_ID to .env.local' },
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id:     GOOGLE_CLIENT_ID,
    redirect_uri:  REDIRECT_URI,
    response_type: 'code',
    scope:         'openid email profile',
    access_type:   'offline',
    prompt:        'select_account',
  });

  return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}

// ── Step 2: Handle callback ──────────────────────────────────────────────────
async function handleCallback(code: string): Promise<NextResponse> {
  try {
    // Exchange code for tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id:     GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri:  REDIRECT_URI,
        grant_type:    'authorization_code',
      }),
    });

    if (!tokenRes.ok) throw new Error('Failed to exchange code for token');
    const { access_token } = await tokenRes.json();

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!userRes.ok) throw new Error('Failed to fetch user info from Google');
    const googleUser = await userRes.json() as { sub: string; email: string; name: string };

    // Find or create user
    let user = getUserByEmail(googleUser.email);
    if (!user) {
      user = createUser({
        name:         googleUser.name,
        email:        googleUser.email,
        passwordHash: '', // no password for Google users
        role:         'buyer', // default role — can be changed in profile
        provider:     'google',
      });
    }

    // Create session
    await createSession({
      id:       user.id,
      name:     user.name,
      email:    user.email,
      role:     user.role,
      provider: 'google',
    });

    return NextResponse.redirect(new URL('/', BASE_URL));
  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(new URL('/login?error=google_failed', BASE_URL));
  }
}