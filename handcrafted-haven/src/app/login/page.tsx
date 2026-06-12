'use client'
// src/app/login/page.tsx

import { useActionState } from 'react';
import Link from 'next/link';
import { loginAction, type AuthState } from '@/app/actions/auth';

const colors = {
  primary:        '#5C4033',
  secondary:      '#A0785A',
  accent:         '#4A6741',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  backgroundCard: '#FFFFFF',
  border:         '#E0D0C0',
  textMuted:      '#7A6055',
  error:          '#B91C1C',
  errorBg:        '#FEE2E2',
};

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <main
      id="main-content"
      style={{
        minHeight: '100vh',
        backgroundColor: colors.backgroundWarm,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '2rem' }}>🏡</span>
            <p style={{ fontFamily: "'Georgia', serif", fontSize: '1.4rem', color: colors.primary, margin: '0.5rem 0 0' }}>
              Handcrafted Haven
            </p>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: colors.backgroundCard,
          borderRadius: '16px',
          border: `0.5px solid ${colors.border}`,
          padding: '2.5rem',
        }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: '1.8rem', fontWeight: 400, color: colors.primary, margin: '0 0 0.5rem' }}>
            Welcome back
          </h1>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.textMuted, margin: '0 0 2rem' }}>
            Sign in to your account to continue
          </p>

          {/* Google Auth button */}
          <a
            href="/api/auth/google"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.backgroundCard,
              fontFamily: 'sans-serif',
              fontSize: '0.95rem',
              color: colors.primary,
              textDecoration: 'none',
              marginBottom: '1.5rem',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </a>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '0.5px', backgroundColor: colors.border }} />
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.textMuted }}>or</span>
            <div style={{ flex: 1, height: '0.5px', backgroundColor: colors.border }} />
          </div>

          {/* General error */}
          {state.errors?.general && (
            <div style={{
              backgroundColor: colors.errorBg,
              color: colors.error,
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontFamily: 'sans-serif',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
            }}>
              {state.errors.general}
            </div>
          )}

          {/* Form */}
          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Email */}
            <div>
              <label htmlFor="email" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 500, color: colors.primary, display: 'block', marginBottom: '0.4rem' }}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-describedby={state.errors?.email ? 'email-error' : undefined}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '8px',
                  border: `1px solid ${state.errors?.email ? colors.error : colors.border}`,
                  fontFamily: 'sans-serif',
                  fontSize: '0.95rem',
                  backgroundColor: colors.background,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {state.errors?.email && (
                <p id="email-error" style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.error, margin: '0.3rem 0 0' }}>
                  {state.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <label htmlFor="password" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 500, color: colors.primary }}>
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                aria-describedby={state.errors?.password ? 'password-error' : undefined}
                style={{
                  width: '100%',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '8px',
                  border: `1px solid ${state.errors?.password ? colors.error : colors.border}`,
                  fontFamily: 'sans-serif',
                  fontSize: '0.95rem',
                  backgroundColor: colors.background,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {state.errors?.password && (
                <p id="password-error" style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.error, margin: '0.3rem 0 0' }}>
                  {state.errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isPending ? colors.secondary : colors.primary,
                color: colors.background,
                fontFamily: 'sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: isPending ? 'not-allowed' : 'pointer',
                marginTop: '0.25rem',
              }}
            >
              {isPending ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          {/* Register link */}
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', color: colors.textMuted, textAlign: 'center', margin: '1.5rem 0 0' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{ color: colors.primary, fontWeight: 500 }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}