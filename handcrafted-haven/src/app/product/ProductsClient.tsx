'use client'
// src/app/products/ProductsClient.tsx

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const colors = {
  primary:        '#5C4033',
  secondary:      '#A0785A',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  backgroundCard: '#FFFFFF',
  border:         '#E0D0C0',
  borderWarm:     '#D4C4B8',
  textMuted:      '#7A6055',
  cream:          '#C4A882',
};

type Availability = 'in_stock' | 'low_stock' | 'out_of_stock';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  artisan: string;
  availability: Availability;
  rating: number;
  reviewCount: number;
  image: string;
};

const categories = ['All', 'Ceramics', 'Jewelry', 'Textiles'];

function getAvailabilityBadge(status: Availability) {
  switch (status) {
    case 'in_stock':     return { text: 'In Stock',  color: '#4A6741', bg: '#D8E4D0' };
    case 'low_stock':    return { text: 'Low Stock', color: '#8B6914', bg: '#F5E6C0' };
    case 'out_of_stock': return { text: 'Sold Out',  color: '#7A6055', bg: '#EDE0D4' };
  }
}

function renderStars(rating: number) {
  if (rating === 0) return null;
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

export default function ProductsClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return activeCategory === 'All'
      ? products
      : products.filter(
          (p) => p.category === activeCategory
        );
  }, [activeCategory, products]);

  return (
    <>
      {/* Category filter */}
      <section
        aria-label="Filter by category"
        style={{
          backgroundColor: colors.background,
          borderBottom: `0.5px solid ${colors.border}`,
          padding: '1rem 2rem',
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            style={{
              fontFamily: 'sans-serif',
              fontSize: '0.85rem',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: `0.5px solid ${colors.borderWarm}`,
              backgroundColor: activeCategory === cat ? colors.primary : colors.background,
              color: activeCategory === cat ? colors.background : colors.primary,
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
        <span style={{
          fontFamily: 'sans-serif',
          fontSize: '0.85rem',
          color: colors.textMuted,
          marginLeft: 'auto',
        }}>
          {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
        </span>
      </section>

      {/* Products grid */}
      <section
        aria-label="Product listings"
        className="section-padding"
        style={{ maxWidth: '1100px', margin: '0 auto' }}
      >
        {filtered.length === 0 ? (
          <p style={{ fontFamily: 'sans-serif', color: colors.textMuted, textAlign: 'center', padding: '3rem' }}>
            No products found in this category.
          </p>
        ) : (
          <ul
            className="products-grid"
            style={{ listStyle: 'none', padding: 0, margin: 0, alignItems: 'stretch' }}
          >
            {filtered.map((product) => {
              const badge = getAvailabilityBadge(product.availability);
              return (
                <li key={product.id} style={{ display: 'flex' }}>
                  <Link
                    href={`/product/${product.id}`}
                    style={{ textDecoration: 'none', display: 'flex', width: '100%' }}
                    aria-label={`View ${product.name} by ${product.artisan}`}
                  >
                    <article style={{
                      backgroundColor: colors.backgroundCard,
                      borderRadius: '12px',
                      border: `0.5px solid ${colors.border}`,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}>
                      {/* Image — fixed height */}
                      <div style={{
                        height: '200px',
                        flexShrink: 0,
                        overflow: 'hidden',
                        backgroundColor: colors.backgroundWarm,
                        position: 'relative',
                      }}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                        <div style={{
                          position: 'absolute', top: '0.75rem', left: '0.75rem',
                          backgroundColor: badge.bg, color: badge.color,
                          fontFamily: 'sans-serif', fontSize: '0.7rem', fontWeight: 600,
                          padding: '0.2rem 0.6rem', borderRadius: '12px',
                        }}>
                          {badge.text}
                        </div>
                      </div>

                      {/* Info — flexGrow pushes price to bottom */}
                      <div style={{
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                        flexGrow: 1,
                      }}>
                        {/* Category */}
                        <span style={{
                          fontFamily: 'sans-serif', fontSize: '0.7rem', fontWeight: 500,
                          letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.secondary,
                        }}>
                          {product.category}
                        </span>

                        {/* Name — fixed min-height keeps cards aligned */}
                        <h2 style={{
                          fontFamily: "'Georgia', serif", fontSize: '1.2rem',
                          fontWeight: 500, color: colors.primary,
                          margin: 0, minHeight: '2.8rem',
                        }}>
                          {product.name}
                        </h2>

                        {/* Artisan */}
                        <p style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.textMuted, margin: 0 }}>
                          by <span style={{ color: colors.secondary }}>{product.artisan}</span>
                        </p>

                        {/* Rating */}
                        <div style={{ minHeight: '1.2rem' }}>
                          {product.rating > 0 && (
                            <p
                              aria-label={`${product.rating} out of 5 stars`}
                              style={{ fontFamily: 'sans-serif', fontSize: '0.8rem', color: colors.secondary, margin: 0 }}
                            >
                              {renderStars(product.rating)}{' '}
                              <span style={{ color: colors.textMuted }}>({product.reviewCount})</span>
                            </p>
                          )}
                        </div>

                        {/* Price + CTA — pushed to bottom by flexGrow on parent */}
                        <div style={{
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem',
                        }}>
                          <span style={{
                            fontFamily: "'Georgia', serif", fontSize: '1.2rem',
                            fontWeight: 500, color: colors.primary,
                          }}>
                            ${product.price.toFixed(2)}
                          </span>
                          <span style={{
                            backgroundColor: product.availability === 'out_of_stock' ? colors.cream : colors.primary,
                            color: colors.background,
                            padding: '0.4rem 0.9rem', borderRadius: '6px',
                            fontFamily: 'sans-serif', fontSize: '0.8rem',
                          }}>
                            {product.availability === 'out_of_stock' ? 'Sold out' : 'View item'}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}