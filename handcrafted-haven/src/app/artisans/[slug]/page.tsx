// src/app/artisans/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
  h2:         { fontFamily: "'Georgia', serif", fontSize: '1.8rem', fontWeight: 500, color: '#5C4033' },
  h3:         { fontFamily: "'Georgia', serif", fontSize: '1.4rem', fontWeight: 500, color: '#5C4033' },
  label:      { fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#4A6741' },
  body:       { fontFamily: 'sans-serif', fontSize: '1rem', color: '#7A6055', lineHeight: 1.8 },
  subheading: { fontFamily: 'sans-serif', fontSize: '1.125rem', color: '#A0785A' },
};

const artisans = [
  {
    slug:      'maria-santos',
    name:      'Maria Santos',
    specialty: 'Ceramics & Pottery',
    location:  'Oaxaca, Mexico',
    initials:  'MS',
    memberSince: 'January 2024',
    bio: [
      'I discovered the wheel in my grandmother\'s courtyard when I was seven years old. She never taught me formally — I simply watched her hands for years until the clay began to speak to me too.',
      'After studying fine arts in Mexico City, I returned to Oaxaca determined to carry forward the Zapotec ceramic tradition while making it my own. Each piece I throw carries the weight of that history: the mineral-rich Oaxacan clay, the wood-fired glazes mixed by hand, the slow drying under the valley sun.',
      'My work is not mass-produced. A single bowl may take three weeks from raw clay to finished piece. I believe that patience leaves a fingerprint on an object that the person who eventually holds it can feel, even if they can\'t name it.',
    ],
    productCount: 12,
    reviewCount:  87,
    rating:       '4.9',
    products: [
      { id: 'p1', name: 'Hand-Thrown Clay Bowl', price: '$48.00', description: 'Wide-rimmed stoneware bowl, food-safe glaze, dishwasher safe.', icon: '🏺', inStock: true, rating: '5.0', reviews: 23 },
      { id: 'p2', name: 'Terracotta Vase',       price: '$72.00', description: 'Tall slip-cast vase with matte terracotta glaze.', icon: '🏺', inStock: true, rating: '4.9', reviews: 18 },
      { id: 'p3', name: 'Ceramic Mug Set',       price: '$55.00', description: 'Set of two wheel-thrown mugs, 12oz each.', icon: '🏺', inStock: false, rating: '4.8', reviews: 31 },
      { id: 'p4', name: 'Stoneware Planter',     price: '$38.00', description: 'Drainage-hole planter with sage green reactive glaze.', icon: '🪴', inStock: true, rating: '4.9', reviews: 15 },
    ],
    social: { instagram: '#', website: '#' },
  },
  {
    slug:      'juan-aguirre',
    name:      'Juan Aguirre',
    specialty: 'Silversmithing',
    location:  'San José, Costa Rica',
    initials:  'JA',
    memberSince: 'March 2024',
    bio: [
      'Every piece of jewelry I create starts with a story — a love letter, a milestone, a memory. I hand-forge each item using traditional silversmithing techniques passed down through three generations of my family.',
      'I trained under my father, who trained under his. The tools on my bench are older than I am. But my designs are contemporary: I\'m interested in the tension between the ancient process and the modern moment.',
      'I work exclusively with recycled silver and ethically sourced stones. When you wear one of my pieces, I want you to know exactly where every component came from and who shaped it.',
    ],
    productCount: 8,
    reviewCount:  54,
    rating:       '4.8',
    products: [
      { id: 'p5', name: 'Silver Leaf Earrings', price: '$65.00',  description: 'Oxidized sterling silver, hammered texture, hypoallergenic ear wires.', icon: '💍', inStock: true,  rating: '5.0', reviews: 19 },
      { id: 'p6', name: 'Hammered Band Ring',   price: '$90.00',  description: 'Recycled sterling silver. Available in sizes 5–12.', icon: '💍', inStock: true,  rating: '4.7', reviews: 22 },
      { id: 'p7', name: 'Chain Necklace',       price: '$110.00', description: 'Hand-linked 18" chain with a small hammered pendant.', icon: '💍', inStock: true,  rating: '4.9', reviews: 13 },
    ],
    social: { instagram: '#', website: '#' },
  },
  {
    slug:      'ana-toledo',
    name:      'Ana Toledo',
    specialty: 'Textile Weaving',
    location:  'Guatemala City, Guatemala',
    initials:  'AT',
    memberSince: 'June 2024',
    bio: [
      'Weaving is how my family has communicated for generations. The patterns are a language — every color and motif carries meaning that words sometimes can\'t hold. I learned on a backstrap loom before I could read.',
      'I use natural dyes exclusively: indigo, cochineal, marigold, and bark tannins gathered from the highlands around my studio. The colors shift slightly with every batch — that\'s not imperfection, that\'s the living quality of natural materials.',
      'My mission is to make textiles beautiful enough that people genuinely want to live with them, and to ensure my nieces and their daughters have a craft worth inheriting.',
    ],
    productCount: 15,
    reviewCount:  112,
    rating:       '5.0',
    products: [
      { id: 'p8',  name: 'Woven Wall Hanging', price: '$120.00', description: 'Natural-dye cotton on driftwood dowel. 60cm × 45cm.', icon: '🧵', inStock: true,  rating: '5.0', reviews: 41 },
      { id: 'p9',  name: 'Handwoven Tote Bag', price: '$68.00',  description: 'Market tote in striped cotton. Reinforced handles.', icon: '🧵', inStock: true,  rating: '4.9', reviews: 28 },
      { id: 'p10', name: 'Table Runner',        price: '$45.00',  description: '90cm × 35cm. Indigo and natural cotton. Machine washable.', icon: '🧵', inStock: true,  rating: '5.0', reviews: 33 },
      { id: 'p11', name: 'Cushion Cover',       price: '$52.00',  description: '45cm × 45cm. Zip closure. Geometric pattern in cochineal red.', icon: '🧵', inStock: false, rating: '4.8', reviews: 10 },
    ],
    social: { instagram: '#', etsy: '#' },
  },
];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return artisans.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artisan = artisans.find((a) => a.slug === slug);
  if (!artisan) return { title: 'Artisan Not Found' };
  return {
    title: artisan.name,
    description: `${artisan.specialty} from ${artisan.location}. ${artisan.bio[0]}`,
  };
}

export default async function ArtisanProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const artisan = artisans.find((a) => a.slug === slug);
  if (!artisan) notFound();

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ backgroundColor: colors.background, borderBottom: `0.5px solid ${colors.borderWarm}`, padding: '0.75rem 2rem' }}>
        <ol style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: 'sans-serif', fontSize: '0.85rem' }}>
          <li><Link href="/" style={{ color: colors.secondary, textDecoration: 'none' }}>Home</Link></li>
          <li aria-hidden="true" style={{ color: colors.textMuted }}>›</li>
          <li><Link href="/artisans" style={{ color: colors.secondary, textDecoration: 'none' }}>Artisans</Link></li>
          <li aria-hidden="true" style={{ color: colors.textMuted }}>›</li>
          <li aria-current="page" style={{ color: colors.textMuted }}>{artisan.name}</li>
        </ol>
      </nav>

      <main id="main-content" style={{ backgroundColor: colors.background, minHeight: '100vh' }}>

        {/* Profile header */}
        <section aria-labelledby="artisan-name" style={{ backgroundColor: colors.backgroundWarm, padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2.5rem', alignItems: 'start' }}>

            {/* Avatar */}
            <div aria-hidden="true" style={{
              width: '120px', height: '120px',
              backgroundColor: colors.primary,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: colors.background,
              fontFamily: 'sans-serif',
              fontSize: '2.5rem', fontWeight: 700,
              flexShrink: 0,
              border: `3px solid ${colors.secondary}`,
            }}>
              {artisan.initials}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ ...typography.label, margin: 0 }}>{artisan.specialty}</p>
              <h1 id="artisan-name" style={{ ...typography.h1, margin: 0, lineHeight: 1.1 }}>{artisan.name}</h1>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.95rem', color: colors.textMuted, margin: 0 }}>
                📍 {artisan.location} · Member since {artisan.memberSince}
              </p>

              {/* Stats */}
              <dl style={{ display: 'flex', gap: '2rem', margin: '0.5rem 0 0', flexWrap: 'wrap' }}>
                {[
                  { label: 'Products',    value: artisan.productCount },
                  { label: 'Reviews',     value: artisan.reviewCount  },
                  { label: 'Avg. rating', value: `${artisan.rating} ★` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt style={{ fontFamily: 'sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.textMuted }}>{label}</dt>
                    <dd style={{ fontFamily: "'Georgia', serif", fontSize: '1.4rem', fontWeight: 500, color: colors.primary, margin: 0 }}>{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Social links */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {artisan.social.instagram && (
                  <a href={artisan.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in new tab)" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.primary, textDecoration: 'none', padding: '0.4rem 0.9rem', border: `0.5px solid ${colors.borderWarm}`, borderRadius: '20px', backgroundColor: colors.background }}>
                    📸 Instagram
                  </a>
                )}
                {artisan.social.website && (
                  <a href={artisan.social.website} target="_blank" rel="noopener noreferrer" aria-label="Website (opens in new tab)" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.primary, textDecoration: 'none', padding: '0.4rem 0.9rem', border: `0.5px solid ${colors.borderWarm}`, borderRadius: '20px', backgroundColor: colors.background }}>
                    🌐 Website
                  </a>
                )}
                {artisan.social.etsy && (
                  <a href={artisan.social.etsy} target="_blank" rel="noopener noreferrer" aria-label="Etsy shop (opens in new tab)" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.primary, textDecoration: 'none', padding: '0.4rem 0.9rem', border: `0.5px solid ${colors.borderWarm}`, borderRadius: '20px', backgroundColor: colors.background }}>
                    🛍️ Etsy
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Biography */}
        <section aria-labelledby="bio-heading" style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 id="bio-heading" style={{ ...typography.h2, marginBottom: '1.5rem' }}>
            About {artisan.name.split(' ')[0]}
          </h2>
          <div style={{ borderLeft: `3px solid ${colors.secondary}`, paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {artisan.bio.map((paragraph, i) => (
              <p key={i} style={{
                fontFamily: "'Georgia', serif",
                fontSize: i === 0 ? '1.1rem' : '1rem',
                lineHeight: 1.85,
                color: i === 0 ? colors.primary : colors.textMuted,
                margin: 0,
                fontStyle: 'italic',
              }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Products */}
        <section aria-labelledby="products-heading" style={{ backgroundColor: colors.backgroundWarm, padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <h2 id="products-heading" style={{ ...typography.h2, margin: 0 }}>
                {artisan.name.split(' ')[0]}&apos;s Work
              </h2>
              <span style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.textMuted }}>
                {artisan.products.length} items
              </span>
            </div>

            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
              {artisan.products.map((product) => (
                <li key={product.id}>
                  <article style={{ backgroundColor: colors.backgroundCard, borderRadius: '12px', border: `0.5px solid ${colors.border}`, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                    {/* Product image placeholder */}
                    <div aria-hidden="true" style={{ height: '140px', backgroundColor: colors.backgroundWarm, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                      {product.icon}
                    </div>

                    <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
                      <h3 style={{ ...typography.h3, margin: 0, fontSize: '1.05rem' }}>{product.name}</h3>
                      <p style={{ ...typography.body, fontSize: '0.875rem', margin: 0, flexGrow: 1 }}>{product.description}</p>

                      {/* Rating */}
                      <p aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`} style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.secondary, margin: 0 }}>
                        {'★'.repeat(Math.floor(Number(product.rating)))}{'☆'.repeat(5 - Math.floor(Number(product.rating)))} ({product.reviews})
                      </p>

                      {/* Price + CTA */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                        <span style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem', fontWeight: 500, color: colors.primary }}>
                          {product.price}
                        </span>
                        {product.inStock ? (
                          <Link href={`/products/${product.id}`} style={{ backgroundColor: colors.primary, color: colors.background, padding: '0.45rem 1rem', borderRadius: '6px', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '0.85rem' }}>
                            View item
                          </Link>
                        ) : (
                          <span style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.textMuted, border: `0.5px solid ${colors.borderWarm}`, padding: '0.45rem 0.9rem', borderRadius: '6px' }}>
                            Sold out
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Commission CTA */}
        <section aria-labelledby="commission-heading" style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 id="commission-heading" style={{ ...typography.h2, marginBottom: '0.75rem' }}>
            Want something custom?
          </h2>
          <p style={{ ...typography.body, maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            {artisan.name.split(' ')[0]} accepts commission requests. Reach out to discuss your idea.
          </p>
          <Link href={`/contact?artisan=${artisan.slug}`} style={{ backgroundColor: colors.primary, color: colors.background, padding: '0.9rem 2.5rem', borderRadius: '8px', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '0.95rem' }}>
            Request a commission
          </Link>
        </section>

      </main>

      <footer style={{ backgroundColor: colors.dark, padding: '2rem', textAlign: 'center' }}>
        <Link href="/artisans" style={{ fontFamily: 'sans-serif', fontSize: '0.875rem', color: colors.cream, textDecoration: 'none' }}>
          ← Back to all artisans
        </Link>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.secondary, marginTop: '1rem', marginBottom: 0 }}>
          © 2026 Handcrafted Haven and Home.
        </p>
      </footer>
    </>
  );
}