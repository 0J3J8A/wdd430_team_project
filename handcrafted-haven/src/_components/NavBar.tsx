'use client'
// src/app/_components/NavBar.tsx

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

const navItems = ['Shop', 'Artisans', 'About'];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  return (
    <header>
      {/* ── Main nav bar ──────────────────────────────────────────────── */}
      <div className="nav-wrapper">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Handcrafted Haven — home"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <span aria-hidden="true" style={{ fontSize: '1.5rem' }}>🏡</span>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: '1.25rem', fontWeight: 500, color: colors.primary }}>
            Handcrafted Haven
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links">
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

          {/* Auth links */}
          {!loading && (
            <>
              {user ? (
                <>
                  {user.role === 'seller' && (
                    <li>
                      <Link
                        href="/seller/dashboard"
                        style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.accent, textDecoration: 'none' }}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
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
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.secondary, textDecoration: 'none' }}
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
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
                      Get started
                    </Link>
                  </li>
                </>
              )}
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

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      <nav
        id="mobile-menu"
        className={`nav-mobile-menu${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
            {item}
          </Link>
        ))}

        {!loading && (
          <>
            {user ? (
              <>
                <span style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.secondary, padding: '0.75rem 0.5rem', display: 'block' }}>
                  Signed in as {user.name.split(' ')[0]} ({user.role})
                </span>
                {user.role === 'seller' && (
                  <Link href="/seller/dashboard" onClick={() => setMenuOpen(false)}>
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={() => { setMenuOpen(false); logout(); }}
                  style={{
                    fontFamily: 'sans-serif', fontSize: '1rem', color: colors.secondary,
                    padding: '0.75rem 0.5rem', borderBottom: `0.5px solid ${colors.borderWarm}`,
                    background: 'none', border: 'none', borderBottomColor: colors.borderWarm,
                    borderBottomWidth: '0.5px', borderBottomStyle: 'solid',
                    textAlign: 'left', cursor: 'pointer', width: '100%',
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link href="/register" className="nav-mobile-signin" onClick={() => setMenuOpen(false)}>
                  Get started
                </Link>
              </>
            )}
          </>
        )}
      </nav>
    </header>
  );
}