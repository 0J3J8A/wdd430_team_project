// src/app/products/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import NavBar from '../_components/NavBar';
import dynamic from 'next/dynamic';

const ProductsClient = dynamic(
  () => import('./ProductsClient'),
  {
    loading: () => <p>Loading products...</p>,
  }
);


export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse all handcrafted items from our independent artisans.',
};

const colors = {
  primary:        '#5C4033',
  secondary:      '#A0785A',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  cream:          '#C4A882',
  dark:           '#3A2820',
};

const typography = {
  label: { fontFamily: 'sans-serif', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#4A6741' },
};

const products = [
  { id: '1', name: 'Hand-Thrown Clay Bowl',  price: 48.00,  category: 'Ceramics',  artisan: 'Maria Santos',  availability: 'in_stock'  as const, rating: 4.5, reviewCount: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUmOrg74rlOcWQNxp3cjR16TbaPwL9xLY8g&s' },
  { id: '2', name: 'Terracotta Vase',        price: 72.00,  category: 'Ceramics',  artisan: 'Maria Santos',  availability: 'in_stock'  as const, rating: 5.0, reviewCount: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4oBJOziCPJwzIOBiUUL1UgzjO0nGGxKqNVA&s' },
  { id: '3', name: 'Ceramic Mug Set',        price: 55.00,  category: 'Ceramics',  artisan: 'Maria Santos',  availability: 'low_stock' as const, rating: 0,   reviewCount: 0, image: 'https://m.media-amazon.com/images/I/61ZrifSKbrL._AC_UF894,1000_QL80_.jpg' },
  { id: '4', name: 'Silver Leaf Earrings',   price: 65.00,  category: 'Jewelry',   artisan: 'Juan Aguirre',  availability: 'low_stock' as const, rating: 4.5, reviewCount: 2, image: 'https://burnishjewelry.com/cdn/shop/products/4f144818ba244f18851cd7086b1731ff.thumbnail.0000000000_1024x1024.jpg?v=1665266916' },
  { id: '5', name: 'Hammered Ring',          price: 90.00,  category: 'Jewelry',   artisan: 'Juan Aguirre',  availability: 'in_stock'  as const, rating: 0,   reviewCount: 0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQu5YX_WCCIg37KskzWgZK7a9lBxvsYCeDOA&s' },
  { id: '6', name: 'Chain Necklace',         price: 110.00, category: 'Jewelry',   artisan: 'Juan Aguirre',  availability: 'in_stock'  as const, rating: 5.0, reviewCount: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRYP93L7GQH87J9wJPfNN0r6vZOjAk73A7RQ&s' },
  { id: '7', name: 'Woven Wall Hanging',     price: 120.00, category: 'Textiles',  artisan: 'Ana Toledo',    availability: 'in_stock'  as const, rating: 5.0, reviewCount: 2, image: 'https://m.media-amazon.com/images/I/71EN7JSGsiL.jpg' },
  { id: '8', name: 'Handwoven Tote',         price: 68.00,  category: 'Textiles',  artisan: 'Ana Toledo',    availability: 'low_stock' as const, rating: 0,   reviewCount: 0, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgDflnf0V7Fn4Th42qLtJC6Inltt_taYfBAA&s' },
  { id: '9', name: 'Table Runner',           price: 45.00,  category: 'Textiles',  artisan: 'Ana Toledo',    availability: 'in_stock'  as const, rating: 4.0, reviewCount: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT66BnaqE7Ytj8DKLLJ_fsNMc0fSHvmBbssoQ&s' },
];

export default function ProductsPage() {
  return (
    <>
      <NavBar />

      <main id="main-content" style={{ backgroundColor: colors.background, minHeight: '100vh' }}>

        {/* Page header */}
        <section
          aria-labelledby="products-heading"
          className="hero-section"
          style={{ backgroundColor: colors.backgroundWarm }}
        >
          <p style={{ ...typography.label, marginBottom: '1rem' }}>Handmade with love</p>
          <h1 id="products-heading" className="hero-h1">All Products</h1>
          <p className="hero-desc">
            Browse our full collection of handcrafted items made by independent
            artisans. Every purchase supports a maker directly.
          </p>
        </section>

        {/* Client component handles filtering and grid */}
        <ProductsClient products={products} />

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