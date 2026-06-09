'use client'
// src/app/_components/NavBar.tsx
// Client Component — needs useState for the hamburger menu toggle.
// Used in page.tsx, artisans/page.tsx, and artisans/[slug]/page.tsx
// to replace the inline <header>/<nav> block.

import { useState } from 'react';
import Link from 'next/link';
import CartIcon from "@/components/CartIcon";

const colors = {
  primary:    '#5C4033',
  secondary:  '#A0785A',
  background: '#FAF7F4',
  borderWarm: '#D4C4B8',
};

const typography = {
  h3: { fontFamily: "'Georgia', serif", fontSize: '1.25rem', fontWeight: 500, color: '#5C4033' },
};

const navItems = ['Shop', 'Artisans', 'About'];

interface NavBarProps {
  categories?: string[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function NavBar({ 
  categories = [], 
  selectedCategory = 'All', 
  onSelectCategory 
}: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* ── Main nav bar row ─────────────────────────────────────────── */}
      <div className="nav-wrapper">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Handcrafted Haven — home"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>🏡</span>
          <span style={{ ...typography.h3 }}>Handcrafted Haven</span>
        </Link>

        {/* Desktop nav links (hidden on mobile via CSS) */}
        <ul className="nav-links">
          {categories.length > 0 && onSelectCategory && (
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <select
                id="nav-category-select"
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '0.95rem',
                  color: colors.secondary,
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.borderWarm}`,
                  borderRadius: '6px',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                  outline: 'none'
                }}
                aria-label="Filter by category"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </li>
          )}

          {navItems.map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                style={{ fontFamily: 'sans-serif', fontSize: '1rem', color: colors.secondary, textDecoration: 'none' }}
              >
                {item}
              </Link>
            </li>
          ))}
          
          {/* Cart Icon with navbar styles */}
          <li>
            <CartIcon style={{
              fontFamily: 'sans-serif',
              fontSize: '1rem',
              color: colors.secondary,
              textDecoration: 'none',
            }} />
          </li>
          
          <li>
            <Link
              href="/login"
              style={{
                backgroundColor: colors.primary,
                color: colors.background,
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontFamily: 'sans-serif',
                fontSize: '0.9rem',
              }}
            >
              Sign In
            </Link>
          </li>
        </ul>

        {/* Hamburger button (hidden on desktop via CSS) */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ── Mobile dropdown menu ──────────────────────────────────────── */}
      <nav
        id="mobile-menu"
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >

        {categories.length > 0 && onSelectCategory && (
          <div style={{ padding: '0.75rem 1.25rem', borderBottom: `0.5px solid ${colors.borderWarm}` }}>
            <label htmlFor="mobile-category-select" style={{ fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.secondary, display: 'block', marginBottom: '0.25rem' }}>
              Category:
            </label>
            <select
              id="mobile-category-select"
              value={selectedCategory}
              onChange={(e) => {
                onSelectCategory(e.target.value);
                setMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: `1px solid ${colors.borderWarm}`,
                color: colors.primary,
                fontFamily: 'sans-serif'
              }}
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {navItems.map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </Link>
        ))}
        
        {/* Cart link for mobile */}
        <Link
          href="/cart"
          onClick={() => setMenuOpen(false)}
        >
          Cart
        </Link>
        
        <Link
          href="/login"
          className="nav-mobile-signin"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}