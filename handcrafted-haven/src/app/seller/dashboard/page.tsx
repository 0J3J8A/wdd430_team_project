'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SellerNavBar from '../../_components/SellerNavBar';
import { useAuth } from '@/contexts/AuthContext';

const colors = {
  primary:         '#5C4033',
  secondary:      '#A0785A',
  accent:         '#4A6741',
  background:     '#FAF7F4',
  backgroundWarm: '#EDE0D4',
  backgroundCard: '#FFFFFF',
  borderWarm:     '#D4C4B8',
  textMuted:      '#7A6055',
};

const typography = {
  h2: { fontFamily: "'Georgia', serif", fontSize: '2rem', fontWeight: 500, color: '#5C4033' },
  h3: { fontFamily: "'Georgia', serif", fontSize: '1.4rem', fontWeight: 500, color: '#5C4033' },
  subheading: { fontFamily: 'sans-serif', fontSize: '1rem', color: '#A0785A' },
  body: { fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#7A6055' },
  label: { fontFamily: 'sans-serif', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' as const, color: '#4A6741', letterSpacing: '1px' },
};


type ProductImage = {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
};

type Artisan = {
  id: string;
  name: string;
  location: string;
  specialty: string;
  avatarInitials: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  availabilityStatus: "in_stock" | "low_stock" | "out_of_stock";
  stockQuantity: number;
  images: ProductImage[];
  artisan: Artisan;
  averageRating: number;
  reviewCount: number;
  category?: string; 
};


export default function SellerDashboard() {
  const { user, loading: authLoading } = useAuth();
  
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    if (authLoading || !user) return;

    const fetchSellerProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('We cannot load your products at the moment. Please try again later.');
        
        const allProducts = await response.json();

        const filteredProducts = allProducts.filter((product: Product) => 
          String(product.artisan.id) === String(user.id)
        );

        setMyProducts(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('We cannot load your products at the moment. Please try again later.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchSellerProducts();
  }, [user, authLoading]);


  const activeProductsCount = myProducts.filter(p => p.availabilityStatus !== 'out_of_stock').length;
  const totalEarnings = myProducts.reduce((sum, p) => sum + (p.price || 0), 0); 
  const lowStockCount = myProducts.filter(p => p.availabilityStatus === 'low_stock').length;

  if (authLoading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: colors.primary, fontFamily: 'sans-serif' }}>Loading your workshop...</div>;
  }

  return (
    <>
      <SellerNavBar />
      
      <main style={{ backgroundColor: colors.background, minHeight: '100vh', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <header style={{ marginBottom: '2.5rem' }}>
            <span style={typography.label}>Seller Portal</span>
            <h1 style={{ ...typography.h2, marginTop: '0.25rem' }}>Welcome back, {user?.name.split(' ')[0]}!</h1>
            <p style={typography.subheading}>Here is how your workshop is performing today.</p>
          </header>
          {/* <p style={{ color: 'red', fontWeight: 'bold' }}>USER ID: {user?.id}</p> */}

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={statCardStyle}>
              <p style={statTitleStyle}>Inventory Value</p>
              <p style={statValueStyle}>${totalEarnings.toFixed(2)}</p>
              <span style={{ fontSize: '0.8rem', color: colors.accent, fontWeight: 600 }}>Estimated total</span>
            </div>

            <div style={statCardStyle}>
              <p style={statTitleStyle}>Active Products</p>
              <p style={statValueStyle}>{loadingProducts ? '...' : activeProductsCount}</p>
              <span style={{ fontSize: '0.8rem', color: colors.textMuted }}>Items currently in stock</span>
            </div>

            <div style={statCardStyle}>
              <p style={statTitleStyle}>Low Stock Alerts</p>
              <p style={{ ...statValueStyle, color: lowStockCount > 0 ? '#D4A017' : colors.primary }}>
                {loadingProducts ? '...' : lowStockCount}
              </p>
              <span style={{ fontSize: '0.8rem', color: lowStockCount > 0 ? '#D4A017' : colors.textMuted, fontWeight: 600 }}>
                {lowStockCount > 0 ? '⚠️ Needs replenishment' : 'All stock healthy'}
              </span>
            </div>

            <div style={statCardStyle}>
              <p style={statTitleStyle}>Total Reviews</p>
              <p style={{ ...statValueStyle, color: colors.secondary }}>
                {loadingProducts ? '...' : myProducts.reduce((sum, p) => sum + p.reviewCount, 0)}
              </p>
              <span style={{ fontSize: '0.8rem', color: colors.textMuted }}>Across all your items</span>
            </div>
          </section>

          {/* Layout Principal */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem', alignItems: 'start' }} className="dashboard-layout">
            
            {/* Lista de Productos */}
            <section style={{ backgroundColor: colors.backgroundCard, padding: '2rem', borderRadius: '16px', border: `1px solid ${colors.borderWarm}` }}>
              <h2 style={{ ...typography.h3, marginBottom: '1.5rem' }}>Your Listed Products</h2>
              
              {loadingProducts ? (
                <p style={{ color: colors.textMuted, fontFamily: 'sans-serif' }}>Loading your creations...</p>
              ) : error ? (
                <p style={{ color: '#D9534F', fontFamily: 'sans-serif' }}>{error}</p>
              ) : myProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <p style={{ color: colors.textMuted, marginBottom: '1rem', fontFamily: 'sans-serif' }}>You haven't listed any products yet.</p>
                  <Link href="/seller/create" style={{ color: colors.accent, fontWeight: 600, textDecoration: 'none', fontFamily: 'sans-serif' }}>
                    Publish your first craft →
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {myProducts.map((product) => {
                    const isLowStock = product.availabilityStatus === 'low_stock';
                    const isOutOfStock = product.availabilityStatus === 'out_of_stock';
                    
                    return (
                      <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', borderBottom: `1px solid ${colors.backgroundWarm}`, gap: '1rem' }}>
                        

                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: colors.backgroundWarm, flexShrink: 0 }}>
                          {product.images?.[0] && (
                            <img src={product.images[0].url} alt={product.images[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}
                        </div>


                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontFamily: 'sans-serif', margin: '0 0 0.25rem 0', color: colors.primary, fontSize: '1rem' }}>{product.name}</h4>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: colors.secondary, fontFamily: 'sans-serif' }}>
                              {product.category || 'Craft'}
                            </span>
                            <span style={{ 
                              fontSize: '0.75rem', 
                              padding: '0.15rem 0.5rem', 
                              borderRadius: '4px',
                              fontWeight: 600,
                              fontFamily: 'sans-serif',
                              backgroundColor: isOutOfStock ? '#FDF2F2' : isLowStock ? '#FFF8E1' : '#E6F4EA',
                              color: isOutOfStock ? '#D9534F' : isLowStock ? '#D4A017' : colors.accent
                            }}>
                              Stock: {product.stockQuantity}
                            </span>
                          </div>
                        </div>


                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', color: colors.primary, fontFamily: 'sans-serif' }}>
                            ${product.price?.toFixed(2)}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: colors.textMuted, fontFamily: 'sans-serif' }}>
                            ★ {product.averageRating?.toFixed(1) || '0.0'} ({product.reviewCount} revs)
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ backgroundColor: colors.backgroundWarm, padding: '1.5rem', borderRadius: '16px', border: `1px solid ${colors.borderWarm}`, textAlign: 'center' }}>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
                <h3 style={{ ...typography.h3, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Quick Actions</h3>
                <p style={{ ...typography.body, fontSize: '0.85rem', marginBottom: '1.5rem' }}>Ready to share a new creation with the world?</p>
                <Link href="/seller/create" style={{ display: 'block', backgroundColor: colors.primary, color: colors.background, padding: '0.75rem', borderRadius: '8px', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '0.9rem', fontWeight: 600 }}>
                  + List a New Product
                </Link>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}

const statCardStyle = {
  backgroundColor: colors.backgroundCard,
  padding: '1.5rem',
  borderRadius: '12px',
  border: `1px solid ${colors.borderWarm}`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const statTitleStyle = {
  margin: 0,
  fontFamily: 'sans-serif',
  fontSize: '0.85rem',
  color: colors.textMuted,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px'
};

const statValueStyle = {
  margin: '0.5rem 0 0.25rem 0',
  fontFamily: "'Georgia', serif",
  fontSize: '1.75rem',
  fontWeight: 500,
  color: colors.primary,
};