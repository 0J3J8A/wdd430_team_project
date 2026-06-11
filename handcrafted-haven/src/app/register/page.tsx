'use client'
// src/app/register/page.tsx

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { registerAction, type AuthState } from '@/app/actions/auth';

const colors = {
  primary:        '#5C4033',
  secondary:      '#A0785A',
  accent:         '#4A6741',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  backgroundCard: '#FFFFFF',
  border:         '#E0D0C0',
  borderWarm:     '#D4C4B8',
  textMuted:      '#7A6055',
  error:          '#B91C1C',
  errorBg:        '#FEE2E2',
};

const initialState: AuthState = {};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller'>('buyer');

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
      <div style={{ width: '100%', maxWidth: '460px' }}>

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
            Create your account
          </h1>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.textMuted, margin: '0 0 2rem' }}>
            Join our community of artisans and shoppers
          </p>

          {/* Google Auth */}
          <a
            href="/api/auth/google"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem', width: '100%', padding: '0.75rem', borderRadius: '8px',
              border: `1px solid ${colors.border}`, backgroundColor: colors.backgroundCard,
              fontFamily: 'sans-serif', fontSize: '0.95rem', color: colors.primary,
              textDecoration: 'none', marginBottom: '1.5rem', cursor: 'pointer',
              boxSizing: 'border-box' as const,
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

          {/* Form */}
          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Name */}
            <div>
              <label htmlFor="name" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 500, color: colors.primary, display: 'block', marginBottom: '0.4rem' }}>
                Full name
              </label>
              <input
                id="name" name="name" type="text" autoComplete="name" required
                aria-describedby={state.errors?.name ? 'name-error' : undefined}
                style={{
                  width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px',
                  border: `1px solid ${state.errors?.name ? colors.error : colors.border}`,
                  fontFamily: 'sans-serif', fontSize: '0.95rem',
                  backgroundColor: colors.background, outline: 'none', boxSizing: 'border-box' as const,
                }}
              />
              {state.errors?.name && (
                <p id="name-error" style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.error, margin: '0.3rem 0 0' }}>
                  {state.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 500, color: colors.primary, display: 'block', marginBottom: '0.4rem' }}>
                Email address
              </label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                aria-describedby={state.errors?.email ? 'email-error' : undefined}
                style={{
                  width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px',
                  border: `1px solid ${state.errors?.email ? colors.error : colors.border}`,
                  fontFamily: 'sans-serif', fontSize: '0.95rem',
                  backgroundColor: colors.background, outline: 'none', boxSizing: 'border-box' as const,
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
              <label htmlFor="password" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 500, color: colors.primary, display: 'block', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input
                id="password" name="password" type="password"
                autoComplete="new-password" required
                aria-describedby="password-hint"
                style={{
                  width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px',
                  border: `1px solid ${state.errors?.password ? colors.error : colors.border}`,
                  fontFamily: 'sans-serif', fontSize: '0.95rem',
                  backgroundColor: colors.background, outline: 'none', boxSizing: 'border-box' as const,
                }}
              />
              <p id="password-hint" style={{ fontFamily: 'sans-serif', fontSize: '0.78rem', color: state.errors?.password ? colors.error : colors.textMuted, margin: '0.3rem 0 0' }}>
                {state.errors?.password || 'At least 8 characters with one number'}
              </p>
            </div>

            {/* Role selection — controlled with useState */}
            <div>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 500, color: colors.primary, margin: '0 0 0.75rem' }}>
                I want to join as
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[
                  { value: 'buyer'  as const, label: 'Shopper', icon: '🛍️', desc: 'Browse and buy handcrafted items' },
                  { value: 'seller' as const, label: 'Artisan', icon: '🏺', desc: 'Sell your handcrafted creations' },
                ].map(({ value, label, icon, desc }) => {
                  const isSelected = selectedRole === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedRole(value)}
                      aria-pressed={isSelected}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        padding: '1rem',
                        borderRadius: '10px',
                        border: `2px solid ${isSelected ? colors.primary : colors.borderWarm}`,
                        backgroundColor: isSelected ? colors.backgroundWarm : colors.background,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                      <span style={{ fontFamily: "'Georgia', serif", fontSize: '1rem', fontWeight: 500, color: colors.primary }}>
                        {label}
                      </span>
                      <span style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', color: colors.textMuted }}>
                        {desc}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Hidden input passes the selected role to the Server Action */}
              <input type="hidden" name="role" value={selectedRole} />
              {state.errors?.role && (
                <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.error, margin: '0.3rem 0 0' }}>
                  {state.errors.role}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              style={{
                width: '100%', padding: '0.85rem', borderRadius: '8px', border: 'none',
                backgroundColor: isPending ? colors.secondary : colors.primary,
                color: colors.background, fontFamily: 'sans-serif', fontSize: '1rem',
                fontWeight: 600, cursor: isPending ? 'not-allowed' : 'pointer', marginTop: '0.25rem',
              }}
            >
              {isPending ? 'Creating account…' : 'Create account'}
            </button>
          </form>

          {/* Login link */}
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', color: colors.textMuted, textAlign: 'center', margin: '1.5rem 0 0' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: colors.primary, fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}