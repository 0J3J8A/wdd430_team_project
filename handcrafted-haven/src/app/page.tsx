// src/app/page.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import NavBar from './_components/NavBar';

const typography = {
  h2: { fontFamily: "'Georgia', serif", fontSize: '2.5rem', fontWeight: 500, color: '#5C4033' },
  h3: { fontFamily: "'Georgia', serif", fontSize: '1.625rem', fontWeight: 500, color: '#5C4033' },
  subheading: { fontFamily: 'sans-serif', fontSize: '1.125rem', color: '#A0785A' },
  body: { fontFamily: 'sans-serif', fontSize: '1rem', color: '#7A6055', lineHeight: 1.8 },
  label: { fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#4A6741' },
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
};

const MOCK_PRODUCTS = [
  { id: 1, name: 'Handcrafted Clay Vase', category: 'Ceramics', price: 44.99 },
  { id: 2, name: 'Porcelain Tea Set', category: 'Ceramics', price: 79.95 },
  { id: 3, name: 'Ceramic Planter Pot', category: 'Ceramics', price: 34.50 },
  { id: 4, name: 'Stoneware Dinner Plate', category: 'Ceramics', price: 24.99 },
  { id: 5, name: 'Glazed Coffee Mug', category: 'Ceramics', price: 19.95 },

  { id: 6, name: 'Woven Cotton Blanket', category: 'Textiles', price: 64.50 },
  { id: 7, name: 'Linen Table Runner', category: 'Textiles', price: 27.99 },
  { id: 8, name: 'Handwoven Wall Hanging', category: 'Textiles', price: 54.95 },
  { id: 9, name: 'Organic Cotton Scarf', category: 'Textiles', price: 32.50 },
  { id: 10, name: 'Decorative Cushion Cover', category: 'Textiles', price: 22.99 },

  { id: 11, name: 'Silver Leaf Necklace', category: 'Jewelry', price: 89.99 },
  { id: 12, name: 'Pearl Drop Earrings', category: 'Jewelry', price: 59.50 },
  { id: 13, name: 'Gold Plated Bracelet', category: 'Jewelry', price: 74.95 },
  { id: 14, name: 'Gemstone Ring', category: 'Jewelry', price: 109.99 },
  { id: 15, name: 'Minimalist Pendant', category: 'Jewelry', price: 49.50 },

  { id: 16, name: 'Oak Serving Board', category: 'Woodwork', price: 42.75 },
  { id: 17, name: 'Hand-Carved Jewelry Box', category: 'Woodwork', price: 87.99 },
  { id: 18, name: 'Walnut Picture Frame', category: 'Woodwork', price: 36.95 },
  { id: 19, name: 'Rustic Wooden Shelf', category: 'Woodwork', price: 119.99 },
  { id: 20, name: 'Maple Cutting Board', category: 'Woodwork', price: 54.50 },

  { id: 21, name: 'Lavender Soy Candle', category: 'Candles', price: 18.99 },
  { id: 22, name: 'Vanilla Spice Candle', category: 'Candles', price: 21.50 },
  { id: 23, name: 'Citrus Breeze Candle', category: 'Candles', price: 19.95 },
  { id: 24, name: 'Sandalwood Candle', category: 'Candles', price: 24.99 },
  { id: 25, name: 'Ocean Mist Candle', category: 'Candles', price: 22.75 },

  { id: 26, name: 'Abstract Sunset Painting', category: 'Paintings', price: 124.99 },
  { id: 27, name: 'Mountain Landscape Painting', category: 'Paintings', price: 159.95 },
  { id: 28, name: 'Coastal Horizon Painting', category: 'Paintings', price: 139.50 },
  { id: 29, name: 'Floral Garden Painting', category: 'Paintings', price: 114.99 },
  { id: 30, name: 'Modern Geometric Painting', category: 'Paintings', price: 174.95 }
];

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoriesSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (selectedCategory !== 'All' && categoriesSectionRef.current) {
      categoriesSectionRef.current.scrollIntoView({
        behavior: 'smooth', 
        block: 'start', 
      });
    }
  }, [selectedCategory]);
  
    const filteredProducts = selectedCategory === 'All'
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
  const featuredArtisans = [
    {
      name: 'Maria Santos',
      specialty: 'Ceramics & Pottery',
      location: 'Oaxaca, Mexico',
      initials: 'MS',
      slug: 'maria-santos',
      bio: 'I have been shaping clay for over 20 years, drawing inspiration from ancient Zapotec traditions. Each bowl I throw carries the memory of my grandmother\'s hands.',
      products: [
        { name: 'Hand-Thrown Clay Bowl', price: '$48.00', icon: '🏺' },
        { name: 'Terracotta Vase',       price: '$72.00', icon: '🏺' },
        { name: 'Ceramic Mug Set',       price: '$55.00', icon: '🏺' },
      ],
    },
    {
      name: 'Juan Aguirre',
      specialty: 'Silversmithing',
      location: 'San José, Costa Rica',
      initials: 'JA',
      slug: 'juan-aguirre',
      bio: 'Every piece of jewelry I create starts with a story — a love letter, a milestone, a memory. I hand-forge each item using traditional silversmithing techniques.',
      products: [
        { name: 'Silver Leaf Earrings', price: '$65.00',  icon: '💍' },
        { name: 'Hammered Ring',        price: '$90.00',  icon: '💍' },
        { name: 'Chain Necklace',       price: '$110.00', icon: '💍' },
      ],
    },
    {
      name: 'Ana Toledo',
      specialty: 'Textile Weaving',
      location: 'Guatemala City',
      initials: 'AT',
      slug: 'ana-toledo',
      bio: 'Weaving is how my family has communicated for generations. I use natural dyes and traditional backstrap looms to create textiles that carry our cultural identity forward.',
      products: [
        { name: 'Woven Wall Hanging', price: '$120.00', icon: '🧵' },
        { name: 'Handwoven Tote',     price: '$68.00',  icon: '🧵' },
        { name: 'Table Runner',       price: '$45.00',  icon: '🧵' },
      ],
    },
  ];

  const categories = [
    { name: 'Ceramics',  icon: '🏺', count: '124' },
    { name: 'Textiles',  icon: '🧵', count: '89'  },
    { name: 'Jewelry',   icon: '💍', count: '203' },
    { name: 'Woodwork',  icon: '🪵', count: '67'  },
    { name: 'Candles',   icon: '🕯️', count: '45'  },
    { name: 'Paintings', icon: '🎨', count: '98'  },
  ];

  return (
    <>
      <NavBar 

        categories={categories.map(c => c.name)} 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />

      <main id="main-content" style={{ backgroundColor: colors.background, minHeight: '100vh' }}>

        {/* Hero */}
        <section aria-labelledby="hero-heading" className="hero-section" style={{ backgroundColor: colors.backgroundWarm }}>
          <p style={{ ...typography.label, marginBottom: '1.5rem' }}>Handmade with love · Est. 2026</p>
          <h1 id="hero-heading" className="hero-h1">
            Every Piece Has a Maker. Every Maker Has a Story.
          </h1>
          <p className="hero-desc">
            Handcrafted Haven connects you directly with artisans who pour their soul into every item they create. Shop with meaning.
          </p>
          <div className="hero-cta">
            <Link href="/products" style={{
              backgroundColor: colors.primary, color: colors.background,
              padding: '1rem 2.5rem', borderRadius: '8px',
              textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '1rem',
            }}>
              Explore Products
            </Link>
            <Link href="/artisans" style={{
              backgroundColor: 'transparent', color: colors.primary,
              padding: '1rem 2.5rem', borderRadius: '8px',
              textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '1rem',
              border: `1px solid ${colors.primary}`,
            }}>
              Meet the Makers
            </Link>
          </div>
        </section>

        {/* Stats Bar */}
        <section aria-label="Platform statistics" className="stats-bar">
          {[
            { number: '500+',    label: 'Artisans'       },
            { number: '2,000+',  label: 'Products'       },
            { number: '10,000+', label: 'Happy Shoppers' },
            { number: '4.9★',   label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ ...typography.h3, color: colors.background, fontSize: '1.75rem', margin: 0 }}>{stat.number}</p>
              <p style={{ ...typography.subheading, color: colors.cream, margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Artisan Stories */}
        <section aria-labelledby="artisans-heading" className="section-padding" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ ...typography.label, marginBottom: '0.5rem' }}>Featured Makers</p>
          <h2 id="artisans-heading" style={{ ...typography.h2, marginBottom: '0.5rem' }}>Meet the Artisans</h2>
          <p style={{ ...typography.subheading, color: colors.textMuted, marginBottom: '3rem' }}>
            The hands, hearts, and stories behind every handcrafted piece.
          </p>

          {featuredArtisans.map((artisan, i) => (
            <article
              key={artisan.name}
              aria-label={`${artisan.name}, ${artisan.specialty}`}
              className={`artisan-story${i % 2 !== 0 ? ' reverse' : ''}`}
              style={{ borderBottom: i < featuredArtisans.length - 1 ? `0.5px solid ${colors.borderWarm}` : 'none' }}
            >
              {/* Products grid — on mobile always shows first */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', order: i % 2 !== 0 ? -1 : 1 }}>
                {artisan.products.map((product, j) => (
                  <Link key={product.name} href="/products" style={{
                    backgroundColor: j === 0 ? colors.backgroundWarm : colors.background,
                    borderRadius: '12px', padding: '1.25rem',
                    textDecoration: 'none', border: `0.5px solid ${colors.border}`,
                    gridColumn: j === 0 ? '1 / -1' : 'auto',
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  }}>
                    <span aria-hidden="true" style={{ fontSize: j === 0 ? '2.5rem' : '2rem' }}>{product.icon}</span>
                    <p style={{ ...typography.subheading, color: colors.primary, margin: 0, fontWeight: 600, fontSize: '0.95rem' }}>{product.name}</p>
                    <p style={{ fontFamily: 'sans-serif', color: colors.accent, fontWeight: 700, margin: 0, fontSize: '0.9rem' }}>{product.price}</p>
                  </Link>
                ))}
              </div>

              {/* Bio */}
              <div style={{ order: i % 2 !== 0 ? 1 : -1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div aria-hidden="true" style={{
                    width: '56px', height: '56px', backgroundColor: colors.primary,
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: colors.background,
                    fontFamily: 'sans-serif', fontSize: '1rem', fontWeight: 700, flexShrink: 0,
                  }}>
                    {artisan.initials}
                  </div>
                  <div>
                    <h3 style={{ ...typography.h3, fontSize: '1.3rem', margin: 0 }}>{artisan.name}</h3>
                    <p style={{ ...typography.subheading, color: colors.secondary, margin: '0.2rem 0 0', fontSize: '0.95rem' }}>
                      {artisan.specialty} · 📍 {artisan.location}
                    </p>
                  </div>
                </div>
                <blockquote style={{
                  borderLeft: `3px solid ${colors.secondary}`, paddingLeft: '1.25rem',
                  margin: '0 0 1.5rem', color: colors.primary,
                  fontFamily: "'Georgia', serif", fontSize: '1rem',
                  lineHeight: 1.8, fontStyle: 'italic',
                }}>
                  &ldquo;{artisan.bio}&rdquo;
                </blockquote>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link href={`/artisans/${artisan.slug}`} style={{
                    backgroundColor: colors.primary, color: colors.background,
                    padding: '0.65rem 1.25rem', borderRadius: '8px',
                    textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '0.9rem',
                  }}>
                    View Profile
                  </Link>
                  <Link href="/products" style={{
                    color: colors.accent, padding: '0.65rem 1.25rem', borderRadius: '8px',
                    textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '0.9rem',
                    border: `1px solid ${colors.accent}`,
                  }}>
                    Shop Their Work
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Categories */}
        <section ref={categoriesSectionRef} aria-labelledby="categories-heading" className="section-padding-warm" style={{ backgroundColor: colors.backgroundWarm, padding: '4rem 1rem', scrollMarginTop: '80px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{ ...typography.label, marginBottom: '0.5rem' }}>Browse</p>
            <h2 id="categories-heading" style={{ ...typography.h2, marginBottom: '0.5rem' }}>Shop by Category</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <p style={{ ...typography.subheading, color: colors.textMuted, margin: 0 }}>
                Find exactly what you are looking for {selectedCategory !== 'All' && `in ${selectedCategory}`}
              </p>
              {selectedCategory !== 'All' && (
                <button 
                  onClick={() => setSelectedCategory('All')}
                  style={{ background: 'none', border: 'none', color: colors.primary, cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}
                >
                  Clear Filter ×
                </button >
              )}
            </div>

            <ul className="categories-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', listStyle: 'none', padding: 0, margin: '0 0 3rem 0' }}>
              {categories.map((cat) => {
                const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();

                return (
                  <li key={cat.name}>
                    <button
                      onClick={() => setSelectedCategory(cat.name)}
                      style={{
                        backgroundColor: colors.background, 
                        borderRadius: '12px',
                        padding: '1.25rem', 
                        border: isSelected 
                          ? `2px solid ${colors.accent}` 
                          : `0.5px solid ${colors.borderWarm}`,
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        width: '100%', 
                        textAlign: 'left',
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0px 4px 12px rgba(0,0,0,0.08)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span aria-hidden="true" style={{ fontSize: '1.75rem' }}>{cat.icon}</span>
                      <div>
                        <p style={{ ...typography.subheading, color: colors.primary, margin: 0, fontWeight: 600, fontSize: '1rem' }}>
                          {cat.name}
                        </p>
                        <p style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.secondary, margin: 0 }}>
                          {cat.count} items
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Displaying Products Inside the Warm Block Context */}
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ ...typography.h3, marginBottom: '1.5rem' }}>
                {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`}
              </h3>
              
              {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: colors.background, borderRadius: '12px', color: colors.textMuted }}>
                  <h4 style={{ ...typography.h3, fontSize: '1.2rem' }}>No products found in this category</h4>
                  <p>Try browsing our other amazing craft items!</p>
                </div>
              ) : (
                <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                  {filteredProducts.map((product) => (
                    <div key={product.id} style={{ backgroundColor: colors.backgroundCard, border: `1px solid ${colors.borderWarm}`, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                      <h4 style={{ ...typography.h3, fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{product.name}</h4>
                      <p style={{ color: colors.secondary, fontSize: '0.9rem', margin: '0 0 1rem 0' }}>{product.category}</p>
                      <p style={{ fontWeight: 'bold', color: colors.primary, margin: 0 }}>${product.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section aria-labelledby="reviews-heading" className="section-padding" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ ...typography.label, marginBottom: '0.5rem' }}>Reviews</p>
          <h2 id="reviews-heading" style={{ ...typography.h2, marginBottom: '2rem' }}>What Shoppers Are Saying</h2>
          <ul className="reviews-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { text: 'The ceramic bowl I ordered is even more beautiful in person. You can feel the love in every curve.', author: 'Sophie L.', rating: '★★★★★' },
              { text: 'Knowing exactly who made my jewelry and hearing their story made this purchase so much more meaningful.', author: 'Carlos M.', rating: '★★★★★' },
              { text: 'Fast shipping, beautiful packaging, and the woven wall hanging is absolutely stunning.', author: 'Priya K.', rating: '★★★★★' },
            ].map((review) => (
              <li key={review.author} style={{
                backgroundColor: colors.backgroundCard, borderRadius: '12px',
                padding: '1.75rem', border: `0.5px solid ${colors.border}`,
              }}>
                <p aria-label="5 out of 5 stars" style={{ color: colors.secondary, fontSize: '1.1rem', marginBottom: '1rem' }}>
                  {review.rating}
                </p>
                <blockquote style={{
                  fontFamily: "'Georgia', serif", color: colors.primary,
                  lineHeight: 1.8, fontSize: '0.95rem', fontStyle: 'italic',
                  margin: '0 0 1.25rem', padding: 0, border: 'none',
                }}>
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <cite style={{ fontFamily: 'sans-serif', color: colors.textMuted, fontSize: '0.85rem', fontStyle: 'normal' }}>
                  — {review.author}
                </cite>
              </li>
            ))}
          </ul>
        </section>

        {/* Artisan CTA */}
        <section aria-labelledby="cta-heading" className="section-padding" style={{ backgroundColor: colors.primary, textAlign: 'center' }}>
          <h2 id="cta-heading" style={{ ...typography.h2, color: colors.background, marginBottom: '1rem' }}>
            Are You an Artisan?
          </h2>
          <p style={{ ...typography.subheading, color: colors.cream, maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            Create your seller profile, share your story, and list your handcrafted goods. Join a community that values the art of making.
          </p>
          <Link href="/register" style={{
            backgroundColor: colors.background, color: colors.primary,
            padding: '1rem 2.5rem', borderRadius: '8px',
            textDecoration: 'none', fontFamily: 'sans-serif',
            fontSize: '1rem', fontWeight: 600,
          }}>
            Start Selling Today
          </Link>
        </section>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#3A2820', color: colors.background, padding: '3rem 1rem' }}>
        <div className="footer-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span aria-hidden="true" style={{ fontSize: '1.25rem' }}>🏡</span>
              <span style={{ fontFamily: "'Georgia', serif", fontSize: '1.1rem', fontWeight: 500 }}>Handcrafted Haven</span>
            </div>
            <p style={{ fontFamily: 'sans-serif', color: colors.cream, fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
              A marketplace where artisans and shoppers connect through the love of handmade goods.
            </p>
          </div>
          {[
            { title: 'Shop',     links: ['All Products', 'Categories', 'New Arrivals', 'Best Sellers'] },
            { title: 'Artisans', links: ['Join as Seller', 'Seller Dashboard', 'Success Stories']      },
            { title: 'Company',  links: ['About Us', 'Contact', 'Privacy Policy', 'Terms']             },
          ].map((col) => (
            <nav key={col.title} aria-label={`${col.title} links`}>
              <h3 style={{ fontFamily: "'Georgia', serif", color: colors.background, fontSize: '1rem', fontWeight: 500, margin: '0 0 1rem' }}>
                {col.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map((link) => (
                  <li key={link} style={{ margin: '0.5rem 0' }}>
                    <Link href="#" style={{ fontFamily: 'sans-serif', color: colors.cream, textDecoration: 'none', fontSize: '0.85rem' }}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div style={{ maxWidth: '1100px', margin: '2rem auto 0', borderTop: `0.5px solid ${colors.primary}`, paddingTop: '1.5rem' }}>
          <p style={{ fontFamily: 'sans-serif', color: colors.secondary, fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
            © 2026 Handcrafted Haven and Home. Made with ❤️ by WDD430 Team.
          </p>
        </div>
      </footer>
    </>
  );
}