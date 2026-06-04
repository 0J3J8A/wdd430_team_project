// src/app/artisans/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import NavBar from '../_components/NavBar';

export const metadata: Metadata = {
  title: 'Artisans',
  description: 'Meet the independent makers behind every handcrafted item on Handcrafted Haven.',
};

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
  cream:          '#C4A882',
  dark:           '#3A2820',
};

const typography = {
  h1:         { fontFamily: "'Georgia', serif", fontSize: '2.5rem', fontWeight: 500, color: '#5C4033' },
  h2:         { fontFamily: "'Georgia', serif", fontSize: '1.4rem', fontWeight: 500, color: '#5C4033' },
  label:      { fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#4A6741' },
  body:       { fontFamily: 'sans-serif', fontSize: '1rem', color: '#7A6055', lineHeight: 1.8 },
  subheading: { fontFamily: 'sans-serif', fontSize: '1.125rem', color: '#A0785A' },
};

const artisans = [
  {
    name: 'Maria Santos', slug: 'maria-santos', specialty: 'Ceramics & Pottery',
    location: 'Oaxaca, Mexico', initials: 'MS',
    bio: 'Shaping clay for over 20 years, drawing inspiration from ancient Zapotec traditions.',
    productCount: 12, rating: '4.9',
  },
  {
    name: 'Juan Aguirre', slug: 'juan-aguirre', specialty: 'Silversmithing',
    location: 'San José, Costa Rica', initials: 'JA',
    bio: 'Hand-forging jewelry using traditional silversmithing techniques passed through three generations.',
    productCount: 8, rating: '4.8',
  },
  {
    name: 'Ana Toledo', slug: 'ana-toledo', specialty: 'Textile Weaving',
    location: 'Guatemala City, Guatemala', initials: 'AT',
    bio: 'Weaving textiles with natural dyes and traditional backstrap looms to carry cultural identity forward.',
    productCount: 15, rating: '5.0',
  },
];

export default function ArtisansPage() {
  return (
    <>
      <NavBar />

      <main id="main-content" style={{ backgroundColor: colors.background, minHeight: '100vh' }}>

        {/* Page header */}
        <section aria-labelledby="artisans-heading" className="hero-section" style={{ backgroundColor: colors.backgroundWarm }}>
          <p style={{ ...typography.label, marginBottom: '1rem' }}>Our Community</p>
          <h1 id="artisans-heading" className="hero-h1">Meet the Artisans</h1>
          <p className="hero-desc">
            Every item on Handcrafted Haven is made by hand. Get to know the
            makers, read their stories, and shop their work directly.
          </p>
        </section>

        {/* Artisan grid */}
        <section aria-label="Artisan list" className="section-padding" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ul className="artisans-grid">
            {artisans.map((artisan) => (
              <li key={artisan.slug}>
                <Link
                  href={`/artisans/${artisan.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                  aria-label={`View ${artisan.name}'s profile`}
                >
                  <article style={{
                    backgroundColor: colors.backgroundCard,
                    borderRadius: '12px', border: `0.5px solid ${colors.border}`, overflow: 'hidden',
                  }}>
                    {/* Card banner */}
                    <div style={{
                      backgroundColor: colors.backgroundWarm, padding: '2rem',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                    }}>
                      <div aria-hidden="true" style={{
                        width: '80px', height: '80px', backgroundColor: colors.primary,
                        borderRadius: '50%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: colors.background,
                        fontFamily: 'sans-serif', fontSize: '1.4rem', fontWeight: 700,
                      }}>
                        {artisan.initials}
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <h2 style={{ ...typography.h2, margin: '0 0 0.25rem' }}>{artisan.name}</h2>
                        <p style={{ ...typography.label, fontSize: '0.75rem', margin: 0 }}>{artisan.specialty}</p>
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '1.5rem' }}>
                      <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.secondary, marginBottom: '0.75rem' }}>
                        📍 {artisan.location}
                      </p>
                      <p style={{ ...typography.body, fontSize: '0.9rem', marginBottom: '1.25rem' }}>{artisan.bio}</p>
                      <div style={{
                        display: 'flex', gap: '1.5rem', paddingTop: '1rem',
                        borderTop: `0.5px solid ${colors.border}`, marginBottom: '1.25rem',
                      }}>
                        <div>
                          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1.2rem', fontWeight: 500, color: colors.primary, margin: 0 }}>{artisan.productCount}</p>
                          <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', color: colors.textMuted, margin: 0 }}>Products</p>
                        </div>
                        <div>
                          <p style={{ fontFamily: "'Georgia', serif", fontSize: '1.2rem', fontWeight: 500, color: colors.primary, margin: 0 }}>{artisan.rating} ★</p>
                          <p style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', color: colors.textMuted, margin: 0 }}>Rating</p>
                        </div>
                      </div>
                      <div style={{
                        backgroundColor: colors.primary, color: colors.background,
                        padding: '0.65rem', borderRadius: '8px', textAlign: 'center',
                        fontFamily: 'sans-serif', fontSize: '0.9rem',
                      }}>
                        View Profile
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Seller CTA */}
        <section aria-labelledby="join-heading" className="section-padding" style={{ backgroundColor: colors.primary, textAlign: 'center' }}>
          <h2 id="join-heading" style={{ fontFamily: "'Georgia', serif", fontSize: '2rem', fontWeight: 500, color: colors.background, marginBottom: '1rem' }}>
            Are You an Artisan?
          </h2>
          <p style={{ fontFamily: 'sans-serif', color: colors.cream, maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            Join our community and share your craft with people who appreciate handmade goods.
          </p>
          <Link href="/register" style={{
            backgroundColor: colors.background, color: colors.primary,
            padding: '0.9rem 2.5rem', borderRadius: '8px', textDecoration: 'none',
            fontFamily: 'sans-serif', fontSize: '1rem', fontWeight: 600,
          }}>
            Start Selling Today
          </Link>
        </section>

      </main>

      <footer style={{ backgroundColor: colors.dark, color: colors.background, padding: '2rem', textAlign: 'center' }}>
        <Link href="/" style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', color: colors.cream, textDecoration: 'none' }}>
          ← Back to home
        </Link>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.secondary, marginTop: '1rem', marginBottom: 0 }}>
          © 2026 Handcrafted Haven and Home.
        </p>
      </footer>
    </>
  );
}