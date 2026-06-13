'use client'
// src/app/_components/SellerNavBar.tsx

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const colors = {
  primary:    '#5C4033',
  secondary:  '#A0785A',
  background: '#FAF7F4',
  borderWarm: '#D4C4B8',
  accent:     '#4A6741',
};

export default function SellerNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <header style={{ borderBottom: `2px solid ${colors.borderWarm}`, position: 'sticky', top: 0, zIndex: 1000, backgroundColor: colors.background }}>
      <div className="nav-wrapper">
        {/* Brand */}
        <Link
          href="/seller"
          aria-label="Handcrafted Haven — Seller Dashboard"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>🏡</span>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: '1.25rem', fontWeight: 500, color: colors.primary }}>
            Handcrafted Haven <span style={{ fontWeight: 400, color: colors.secondary }}>| Studio</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links">
        
          <li>
            <Link href="/seller/create" style={{ fontFamily: 'sans-serif', fontSize: '1rem', color: colors.secondary, textDecoration: 'none' }}>
              Add Product
            </Link>
          </li>

          {/* View Public Shop Button */}
          <li>
            <Link
              href="/"
              style={{
                border: `1px solid ${colors.accent}`,
                color: colors.accent,
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontFamily: 'sans-serif',
                fontSize: '0.9rem',
                fontWeight: 600,
                backgroundColor: 'transparent',
                transition: 'all 0.2s ease',
              }}
            >
              🛒 View Public Shop
            </Link>
          </li>

          {/* Auth links (using team's context and styles) */}
          {!loading && user && (
            <>
              <li>
                <span style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.secondary }}>
                  Hi, {user.name.split(' ')[0]}
                </span>
              </li>
              <li>
                <button
                  onClick={logout}
                  style={{
                    backgroundColor: 'transparent',
                    color: colors.primary,
                    padding: '0.5rem 1.25rem',
                    borderRadius: '8px',
                    border: `1px solid ${colors.primary}`,
                    fontFamily: 'sans-serif',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        <Link href="/seller" onClick={() => setMenuOpen(false)} style={{ color: colors.primary, fontWeight: 600 }}>
          Dashboard
        </Link>
        <Link href="/seller/create" onClick={() => setMenuOpen(false)}>
          Add Product
        </Link>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: colors.accent, fontWeight: 600 }}>
          View Public Shop
        </Link>

        {/* Auth links for mobile */}
        {!loading && user && (
          <>
            <span style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.secondary, padding: '0.75rem 0.5rem', display: 'block' }}>
              Signed in as {user.name.split(' ')[0]} (Seller)
            </span>
            <button
              onClick={() => { setMenuOpen(false); logout(); }}
              style={{
                fontFamily: 'sans-serif', fontSize: '1rem', color: colors.secondary,
                padding: '0.75rem 0.5rem', background: 'none', border: 'none',
                borderBottom: `0.5px solid ${colors.borderWarm}`,
                textAlign: 'left', cursor: 'pointer', width: '100%',
              }}
            >
              Sign Out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}