// src/app/artisans/[slug]/not-found.tsx
// Shown when notFound() is called in page.tsx — e.g. slug doesn't exist.
// Next.js automatically returns a 404 HTTP status.

import Link from 'next/link';

const colors = {
  primary:        '#5C4033',
  secondary:      '#A0785A',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  border:         '#E0D0C0',
  textMuted:      '#7A6055',
};

export default function NotFound() {
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
      <span aria-hidden="true" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏺</span>

      <h1 style={{
        fontFamily: "'Georgia', serif",
        fontSize: '2.5rem',
        fontWeight: 500,
        color: colors.primary,
        marginBottom: '1rem',
      }}>
        Artisan Not Found
      </h1>

      <p style={{
        fontFamily: 'sans-serif',
        fontSize: '1.05rem',
        color: colors.textMuted,
        maxWidth: '420px',
        lineHeight: 1.8,
        marginBottom: '2.5rem',
      }}>
        We couldn&apos;t find this artisan. They may have changed their profile
        URL, or the link you followed might be outdated.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/artisans" style={{
          backgroundColor: colors.primary,
          color: colors.background,
          padding: '0.85rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: 'sans-serif',
          fontSize: '0.95rem',
        }}>
          Browse all artisans
        </Link>
        <Link href="/" style={{
          color: colors.primary,
          padding: '0.85rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: 'sans-serif',
          fontSize: '0.95rem',
          border: `1px solid ${colors.primary}`,
        }}>
          Back to home
        </Link>
      </div>
    </main>
  );
}