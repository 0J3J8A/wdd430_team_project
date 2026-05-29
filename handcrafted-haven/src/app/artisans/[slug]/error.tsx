'use client'
// src/app/artisans/[slug]/error.tsx
// Error boundary for this route segment.
// MUST be a Client Component — React error boundaries require it.

import { useEffect } from 'react';
import Link from 'next/link';

const colors = {
  primary:        '#5C4033',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  border:         '#E0D0C0',
  textMuted:      '#7A6055',
};

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error('[ArtisanProfileError]', error);
  }, [error]);

  return (
    <main
      id="main-content"
      style={{
        minHeight: '70vh',
        backgroundColor: colors.backgroundWarm,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>😔</span>

      <h1 style={{
        fontFamily: "'Georgia', serif",
        fontSize: '2.5rem',
        fontWeight: 500,
        color: colors.primary,
        marginBottom: '1rem',
      }}>
        Something went wrong
      </h1>

      <p style={{
        fontFamily: 'sans-serif',
        fontSize: '1.05rem',
        color: colors.textMuted,
        maxWidth: '420px',
        lineHeight: 1.8,
        marginBottom: '2.5rem',
      }}>
        We had trouble loading this artisan&apos;s profile. Please try again,
        or come back later.
      </p>

      {/* digest is a server-side error ID — useful for debugging logs */}
      {error.digest && (
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', color: colors.textMuted, marginBottom: '2rem' }}>
          Error ID: <code style={{ fontFamily: 'monospace' }}>{error.digest}</code>
        </p>
      )}

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={unstable_retry}
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
            padding: '0.85rem 2rem',
            borderRadius: '8px',
            border: 'none',
            fontFamily: 'sans-serif',
            fontSize: '0.95rem',
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
        <Link href="/artisans" style={{
          color: colors.primary,
          padding: '0.85rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: 'sans-serif',
          fontSize: '0.95rem',
          border: `1px solid ${colors.border}`,
        }}>
          Browse artisans
        </Link>
      </div>
    </main>
  );
}