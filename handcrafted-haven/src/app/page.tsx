import Link from 'next/link';
import CartIcon from "@/components/CartIcon";

const typography = {
  h1: { fontFamily: "'Georgia', serif", fontSize: '3.5rem', fontWeight: 500, color: '#5C4033' },
  h2: { fontFamily: "'Georgia', serif", fontSize: '2.5rem', fontWeight: 500, color: '#5C4033' },
  h3: { fontFamily: "'Georgia', serif", fontSize: '1.625rem', fontWeight: 500, color: '#5C4033' },
  subheading: { fontFamily: 'sans-serif', fontSize: '1.125rem', color: '#A0785A' },
  body: { fontFamily: 'sans-serif', fontSize: '1rem', color: '#7A6055', lineHeight: 1.8 },
  label: { fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#4A6741' },
};

const colors = {
  primary: '#5C4033',
  secondary: '#A0785A',
  accent: '#4A6741',
  background: '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  backgroundCard: '#FFFFFF',
  border: '#E0D0C0',
  borderWarm: '#D4C4B8',
  textMuted: '#7A6055',
  cream: '#C4A882',
};

export default function Home() {
  const featuredArtisans = [
    {
      name: 'Maria Santos',
      specialty: 'Ceramics & Pottery',
      location: 'Oaxaca, Mexico',
      initials: 'MS',
      bio: 'I have been shaping clay for over 20 years, drawing inspiration from ancient Zapotec traditions. Each bowl I throw carries the memory of my grandmother\'s hands.',
      products: [
        { id: '1', name: 'Hand-Thrown Clay Bowl', price: '$48.00', icon: '🏺' },
        { id: '2', name: 'Terracotta Vase', price: '$72.00', icon: '🏺' },
        { id: '3', name: 'Ceramic Mug Set', price: '$55.00', icon: '🏺' },
      ],
    },
    {
      name: 'Juan Aguirre',
      specialty: 'Silversmithing',
      location: 'San José, Costa Rica',
      initials: 'JA',
      bio: 'Every piece of jewelry I create starts with a story — a love letter, a milestone, a memory. I hand-forge each item using traditional silversmithing techniques.',
      products: [
        { id: '4', name: 'Silver Leaf Earrings', price: '$65.00', icon: '💍' },
        { id: '5', name: 'Hammered Ring', price: '$90.00', icon: '💍' },
        { id: '6', name: 'Chain Necklace', price: '$110.00', icon: '💍' },
      ],
    },
    {
      name: 'Ana Toledo',
      specialty: 'Textile Weaving',
      location: 'Guatemala City',
      initials: 'AT',
      bio: 'Weaving is how my family has communicated for generations. I use natural dyes and traditional backstrap looms to create textiles that carry our cultural identity forward.',
      products: [
        { id: '7', name: 'Woven Wall Hanging', price: '$120.00', icon: '🧵' },
        { id: '8', name: 'Handwoven Tote', price: '$68.00', icon: '🧵' },
        { id: '9', name: 'Table Runner', price: '$45.00', icon: '🧵' },
      ],
    },
  ];

  const categories = [
    { name: 'Ceramics', icon: '🏺', count: '124' },
    { name: 'Textiles', icon: '🧵', count: '89' },
    { name: 'Jewelry', icon: '💍', count: '203' },
    { name: 'Woodwork', icon: '🪵', count: '67' },
    { name: 'Candles', icon: '🕯️', count: '45' },
    { name: 'Paintings', icon: '🎨', count: '98' },
  ];

  return (
    <main style={{ fontFamily: "'Georgia', serif", backgroundColor: colors.background, minHeight: '100vh' }}>

      {/* Navigation */}
      <nav style={{
        backgroundColor: colors.background,
        borderBottom: `0.5px solid ${colors.borderWarm}`,
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🏡</span>
          <span style={{ ...typography.h3, fontSize: '1.25rem' }}>
            Handcrafted Haven
          </span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Shop', 'Artisans', 'About'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={{
              ...typography.subheading,
              color: colors.secondary,
              textDecoration: 'none',
            }}>{item}</Link>
          ))}

          {/*CartIcon*/}
          <CartIcon style={{
            ...typography.subheading,
            color: colors.secondary,
            textDecoration: 'none',
          }} />

          <Link href="/login" style={{
            backgroundColor: colors.primary,
            color: colors.background,
            padding: '0.5rem 1.25rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'sans-serif',
            fontSize: '0.9rem',
          }}>Sign In</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        backgroundColor: colors.backgroundWarm,
        padding: '7rem 2rem',
        textAlign: 'center',
      }}>
        <p style={{ ...typography.label, marginBottom: '1.5rem' }}>
          Handmade with love · Est. 2026
        </p>
        <h1 style={{
          ...typography.h1,
          fontSize: '3.5rem',
          lineHeight: 1.15,
          maxWidth: '800px',
          margin: '0 auto 1.5rem',
        }}>
          Every Piece Has a Maker. Every Maker Has a Story.
        </h1>
        <p style={{
          ...typography.body,
          fontSize: '1.125rem',
          maxWidth: '600px',
          margin: '0 auto 3rem',
        }}>
          Handcrafted Haven connects you directly with artisans who pour their soul into every item they create. Shop with meaning.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/products" style={{
            backgroundColor: colors.primary,
            color: colors.background,
            padding: '1rem 2.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'sans-serif',
            fontSize: '1rem',
          }}>
            Explore Products
          </Link>
          <Link href="/artisans" style={{
            backgroundColor: 'transparent',
            color: colors.primary,
            padding: '1rem 2.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontFamily: 'sans-serif',
            fontSize: '1rem',
            border: `1px solid ${colors.primary}`,
          }}>
            Meet the Makers
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        backgroundColor: colors.primary,
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '5rem',
      }}>
        {[
          { number: '500+', label: 'Artisans' },
          { number: '2,000+', label: 'Products' },
          { number: '10,000+', label: 'Happy Shoppers' },
          { number: '4.9★', label: 'Average Rating' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <p style={{ ...typography.h3, color: colors.background, fontSize: '1.75rem', margin: 0 }}>{stat.number}</p>
            <p style={{ ...typography.subheading, color: colors.cream, margin: 0 }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Artisan Stories */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ ...typography.label, marginBottom: '0.5rem' }}>Featured Makers</p>
        <h2 style={{ ...typography.h2, marginBottom: '0.5rem' }}>Meet the Artisans</h2>
        <p style={{ ...typography.subheading, color: colors.textMuted, marginBottom: '4rem' }}>
          The hands, hearts, and stories behind every handcrafted piece.
        </p>

        {featuredArtisans.map((artisan, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: i % 2 === 0 ? '1fr 2fr' : '2fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '6rem',
            paddingBottom: '6rem',
            borderBottom: i < featuredArtisans.length - 1 ? `0.5px solid ${colors.borderWarm}` : 'none',
          }}>

            {i % 2 !== 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {artisan.products.map((product, j) => (
                  <Link key={j} href={`/product/${product.id}`} style={{
                    backgroundColor: j === 0 ? colors.backgroundWarm : colors.background,
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    border: `0.5px solid ${colors.border}`,
                    gridColumn: j === 0 ? '1 / -1' : 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}>
                    <span style={{ fontSize: j === 0 ? '3rem' : '2rem' }}>{product.icon}</span>
                    <p style={{ ...typography.subheading, color: colors.primary, margin: 0, fontWeight: 600 }}>{product.name}</p>
                    <p style={{ fontFamily: 'sans-serif', color: colors.accent, fontWeight: 700, margin: 0 }}>{product.price}</p>
                  </Link>
                ))}
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '64px', height: '64px',
                  backgroundColor: colors.primary,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: colors.background,
                  fontFamily: 'sans-serif',
                  fontSize: '1.1rem', fontWeight: 700, flexShrink: 0,
                }}>
                  {artisan.initials}
                </div>
                <div>
                  <h3 style={{ ...typography.h3, fontSize: '1.4rem', margin: 0 }}>{artisan.name}</h3>
                  <p style={{ ...typography.subheading, color: colors.secondary, margin: '0.25rem 0 0' }}>
                    {artisan.specialty} · 📍 {artisan.location}
                  </p>
                </div>
              </div>
              <blockquote style={{
                borderLeft: `3px solid ${colors.secondary}`,
                paddingLeft: '1.5rem',
                margin: '0 0 2rem',
                color: colors.primary,
                fontFamily: "'Georgia', serif",
                fontSize: '1.1rem',
                lineHeight: 1.8,
                fontStyle: 'italic',
              }}>
                "{artisan.bio}"
              </blockquote>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href={`/artisan/${artisan.name.toLowerCase().replace(' ', '-')}`} style={{
                  backgroundColor: colors.primary,
                  color: colors.background,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontFamily: 'sans-serif',
                  fontSize: '0.9rem',
                }}>
                  View Profile
                </Link>
                <Link href="/products" style={{
                  color: colors.accent,
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontFamily: 'sans-serif',
                  fontSize: '0.9rem',
                  border: `1px solid ${colors.accent}`,
                }}>
                  Shop Their Work
                </Link>
              </div>
            </div>

            {i % 2 === 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {artisan.products.map((product, j) => (
                  <Link key={j} href={`/product/${product.id}`} style={{
                    backgroundColor: j === 0 ? colors.backgroundWarm : colors.background,
                    borderRadius: '12px',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    border: `0.5px solid ${colors.border}`,
                    gridColumn: j === 0 ? '1 / -1' : 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}>
                    <span style={{ fontSize: j === 0 ? '3rem' : '2rem' }}>{product.icon}</span>
                    <p style={{ ...typography.subheading, color: colors.primary, margin: 0, fontWeight: 600 }}>{product.name}</p>
                    <p style={{ fontFamily: 'sans-serif', color: colors.accent, fontWeight: 700, margin: 0 }}>{product.price}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Categories */}
      <section style={{ backgroundColor: colors.backgroundWarm, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ ...typography.label, marginBottom: '0.5rem' }}>Browse</p>
          <h2 style={{ ...typography.h2, marginBottom: '0.5rem' }}>Shop by Category</h2>
          <p style={{ ...typography.subheading, color: colors.textMuted, marginBottom: '2.5rem' }}>
            Find exactly what you are looking for
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {categories.map((cat, i) => (
              <Link key={i} href={`/products?category=${cat.name.toLowerCase()}`} style={{
                backgroundColor: colors.background,
                borderRadius: '12px',
                padding: '1.5rem',
                textDecoration: 'none',
                border: `0.5px solid ${colors.borderWarm}`,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
                <div>
                  <p style={{ ...typography.subheading, color: colors.primary, margin: 0, fontWeight: 600 }}>{cat.name}</p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.secondary, margin: 0 }}>{cat.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ ...typography.label, marginBottom: '0.5rem' }}>Reviews</p>
        <h2 style={{ ...typography.h2, marginBottom: '3rem' }}>What Shoppers Are Saying</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {[
            { text: 'The ceramic bowl I ordered is even more beautiful in person. You can feel the love in every curve.', author: 'Sophie L.', rating: '★★★★★' },
            { text: 'Knowing exactly who made my jewelry and hearing their story made this purchase so much more meaningful.', author: 'Carlos M.', rating: '★★★★★' },
            { text: 'Fast shipping, beautiful packaging, and the woven wall hanging is absolutely stunning.', author: 'Priya K.', rating: '★★★★★' },
          ].map((review, i) => (
            <div key={i} style={{
              backgroundColor: colors.backgroundCard,
              borderRadius: '12px',
              padding: '2rem',
              border: `0.5px solid ${colors.border}`,
            }}>
              <p style={{ color: colors.secondary, fontSize: '1.1rem', marginBottom: '1rem' }}>{review.rating}</p>
              <p style={{ fontFamily: "'Georgia', serif", color: colors.primary, lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "{review.text}"
              </p>
              <p style={{ fontFamily: 'sans-serif', color: colors.textMuted, fontSize: '0.85rem', margin: 0 }}>— {review.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Artisan CTA */}
      <section style={{ backgroundColor: colors.primary, padding: '5rem 2rem', textAlign: 'center' }}>
        <h2 style={{ ...typography.h2, color: colors.background, marginBottom: '1rem' }}>
          Are You an Artisan?
        </h2>
        <p style={{ ...typography.subheading, color: colors.cream, maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
          Create your seller profile, share your story, and list your handcrafted goods. Join a community that values the art of making.
        </p>
        <Link href="/register" style={{
          backgroundColor: colors.background,
          color: colors.primary,
          padding: '1rem 2.5rem',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: 'sans-serif',
          fontSize: '1rem',
          fontWeight: 600,
        }}>
          Start Selling Today
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#3A2820', color: colors.background, padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🏡</span>
              <span style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem', fontWeight: 500 }}>Handcrafted Haven</span>
            </div>
            <p style={{ fontFamily: 'sans-serif', color: colors.cream, fontSize: '0.9rem', lineHeight: 1.7 }}>
              A marketplace where artisans and shoppers connect through the love of handmade goods.
            </p>
          </div>
          {[
            { title: 'Shop', links: ['All Products', 'Categories', 'New Arrivals', 'Best Sellers'] },
            { title: 'Artisans', links: ['Join as Seller', 'Seller Dashboard', 'Success Stories'] },
            { title: 'Company', links: ['About Us', 'Contact', 'Privacy Policy', 'Terms'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ fontFamily: "'Georgia', serif", color: colors.background, marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>{col.title}</h4>
              {col.links.map((link, j) => (
                <p key={j} style={{ margin: '0.5rem 0' }}>
                  <Link href="#" style={{ fontFamily: 'sans-serif', color: colors.cream, textDecoration: 'none', fontSize: '0.85rem' }}>
                    {link}
                  </Link>
                </p>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '1100px', margin: '2rem auto 0', borderTop: `0.5px solid ${colors.primary}`, paddingTop: '1.5rem' }}>
          <p style={{ fontFamily: 'sans-serif', color: colors.secondary, fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
            © 2026 Handcrafted Haven and Home. Made with ❤️ by WDD430 Team.
          </p>
        </div>
      </footer>

    </main>
  );
}