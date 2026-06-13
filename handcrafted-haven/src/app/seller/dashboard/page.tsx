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
  danger:         '#D9534F', 
};

const typography = {
  h2: { fontFamily: "'Georgia', serif", fontSize: '2rem', fontWeight: 500, color: '#5C4033' },
  h3: { fontFamily: "'Georgia', serif", fontSize: '1.4rem', fontWeight: 500, color: '#5C4033' },
  subheading: { fontFamily: 'sans-serif', fontSize: '1rem', color: '#A0785A' },
  body: { fontFamily: 'sans-serif', fontSize: '0.95rem', color: '#7A6055' },
  label: { fontFamily: 'sans-serif', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' as const, color: '#4A6741', letterSpacing: '1px' },
};

type ProductImage = { id: string; url: string; alt: string; isMain: boolean; };
type Artisan = { id: string; name: string; location: string; specialty: string; avatarInitials: string; };

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
  status?: 'active' | 'inactive'; 
};

export default function SellerDashboard() {
  const { user, loading: authLoading } = useAuth();
  
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState('');

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [editStatus, setEditStatus] = useState<'active' | 'inactive'>('active');

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchSellerProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Error al conectar con la API de productos');
        const allProducts = await response.json();

        const filteredProducts = allProducts.filter((product: Product) => 
          String(product.artisan.id) === String(user.id)
        );

        const productsWithStatus = filteredProducts.map((p: Product) => ({
          ...p,
          status: p.status || 'active'
        }));

        setMyProducts(productsWithStatus);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('We cannot load your products at the moment. Please try again later.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchSellerProducts();
  }, [user, authLoading]);


  const handleSaveEdit = () => {
    if (!editingProduct) return;

    let newAvailability: Product['availabilityStatus'] = 'in_stock';
    if (editStock === 0) {
      newAvailability = 'out_of_stock';
    } else if (editStock < 3) {
      newAvailability = 'low_stock'; 
    }


    setMyProducts(prevProducts => 
      prevProducts.map(p => 
        p.id === editingProduct.id 
          ? { ...p, stockQuantity: editStock, availabilityStatus: newAvailability, status: editStatus } 
          : p
      )
    );
    
    setEditingProduct(null); 
  };

  const activeProductsCount = myProducts.filter(p => p.status === 'active' && p.availabilityStatus !== 'out_of_stock').length;
  const totalEarnings = myProducts.reduce((sum, p) => sum + (p.price || 0), 0); 
  const lowStockCount = myProducts.filter(p => p.stockQuantity > 0 && p.stockQuantity < 3).length;

  if (authLoading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: colors.primary, fontFamily: 'sans-serif' }}>Loading your studio...</div>;
  }

  return (
    <>
      <SellerNavBar />
      
      <main style={{ backgroundColor: colors.background, minHeight: '100vh', padding: '3rem 1rem', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <header style={{ marginBottom: '2.5rem' }}>
            <span style={typography.label}>Seller Portal</span>
            <h1 style={{ ...typography.h2, marginTop: '0.25rem' }}>Welcome back, {user?.name.split(' ')[0]}!</h1>
            <p style={typography.subheading}>Here is how your workshop is performing today.</p>
          </header>

          {/* Statistics */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>

            <div style={statCardStyle}>
              <p style={statTitleStyle}>Inventory Value</p>
              <p style={statValueStyle}>${totalEarnings.toFixed(2)}</p>
            </div>
            <div style={statCardStyle}>
              <p style={statTitleStyle}>Active & In Stock</p>
              <p style={statValueStyle}>{loadingProducts ? '...' : activeProductsCount}</p>
            </div>
            <div style={statCardStyle}>
              <p style={statTitleStyle}>Low Stock Alerts</p>
              <p style={{ ...statValueStyle, color: lowStockCount > 0 ? colors.danger : colors.primary }}>
                {loadingProducts ? '...' : lowStockCount}
              </p>
            </div>
            <div style={statCardStyle}>
              <p style={statTitleStyle}>Total Reviews</p>
              <p style={statValueStyle}>{loadingProducts ? '...' : myProducts.reduce((sum, p) => sum + p.reviewCount, 0)}</p>
            </div>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem', alignItems: 'start' }} className="dashboard-layout">
            
            <section style={{ backgroundColor: colors.backgroundCard, padding: '2rem', borderRadius: '16px', border: `1px solid ${colors.borderWarm}` }}>
              <h2 style={{ ...typography.h3, marginBottom: '1.5rem' }}>Your Listed Products</h2>
              
              {loadingProducts ? (
                <p style={{ color: colors.textMuted, fontFamily: 'sans-serif' }}>Loading your creations...</p>
              ) : error ? (
                <p style={{ color: colors.danger, fontFamily: 'sans-serif' }}>{error}</p>
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
                    const isOutOfStock = product.stockQuantity === 0;
                    const isLowStock = product.stockQuantity > 0 && product.stockQuantity < 3;
                    const isInactive = product.status === 'inactive';
                    
                    return (
                      <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', borderBottom: `1px solid ${colors.backgroundWarm}`, gap: '1rem', opacity: isInactive ? 0.6 : 1 }}>
                        
                        <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: colors.backgroundWarm, flexShrink: 0 }}>
                          {product.images?.[0] && (
                            <img src={product.images[0].url} alt={product.images[0].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isOutOfStock ? 'grayscale(100%)' : 'none' }} />
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontFamily: 'sans-serif', margin: '0 0 0.25rem 0', color: colors.primary, fontSize: '1rem' }}>
                            {product.name}
                            {isInactive && <span style={{ fontSize: '0.75rem', backgroundColor: colors.textMuted, color: '#fff', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>Hidden</span>}
                          </h4>
                          
                          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                            <span style={{ fontSize: '0.85rem', color: colors.secondary, fontFamily: 'sans-serif' }}>
                              ${product.price?.toFixed(2)}
                            </span>
                            
                            {/* Visual stock BADGE */}
                            <span style={{ 
                              fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 600, fontFamily: 'sans-serif',
                              backgroundColor: isOutOfStock ? '#FDF2F2' : isLowStock ? '#FFF8E1' : '#E6F4EA',
                              color: isOutOfStock ? colors.danger : isLowStock ? '#D4A017' : colors.accent
                            }}>
                              {isOutOfStock ? 'Out of Stock' : `Stock: ${product.stockQuantity}`}
                            </span>
                            {isLowStock && (
                              <span style={{ fontSize: '0.7rem', backgroundColor: colors.danger, color: '#fff', padding: '2px 6px', borderRadius: '4px', fontFamily: 'sans-serif', fontWeight: 'bold', animation: 'pulse 2s infinite' }}>
                                Low Stock!
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setEditStock(product.stockQuantity);
                            setEditStatus(product.status || 'active');
                          }}
                          style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: `1px solid ${colors.borderWarm}`, backgroundColor: '#fff', color: colors.primary, cursor: 'pointer', fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 600 }}
                        >
                          Quick Edit
                        </button>

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
        {editingProduct && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ backgroundColor: colors.backgroundCard, padding: '2rem', borderRadius: '12px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
              <h3 style={{ ...typography.h3, marginBottom: '0.5rem' }}>Quick Edit</h3>
              <p style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: colors.secondary, marginBottom: '1.5rem' }}>{editingProduct.name}</p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={typography.label}>Inventory Quantity</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <button onClick={() => setEditStock(Math.max(0, editStock - 1))} style={modalBtnStyle}>-</button>
                  <input 
                    type="number" 
                    value={editStock} 
                    onChange={(e) => setEditStock(Math.max(0, parseInt(e.target.value) || 0))}
                    style={{ width: '80px', textAlign: 'center', padding: '0.5rem', borderRadius: '6px', border: `1px solid ${colors.borderWarm}`, fontSize: '1.1rem', fontFamily: 'sans-serif' }}
                  />
                  <button onClick={() => setEditStock(editStock + 1)} style={modalBtnStyle}>+</button>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={typography.label}>Marketplace Visibility</label>
                <select 
                  value={editStatus} 
                  onChange={(e) => setEditStatus(e.target.value as 'active' | 'inactive')}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: `1px solid ${colors.borderWarm}`, marginTop: '0.5rem', fontFamily: 'sans-serif', fontSize: '1rem', backgroundColor: '#fff' }}
                >
                  <option value="active">Active (Visible to buyers)</option>
                  <option value="inactive">Inactive (Hidden from shop)</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => setEditingProduct(null)} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: `1px solid ${colors.borderWarm}`, backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}>
                  Cancel
                </button>
                <button onClick={handleSaveEdit} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: '#fff', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600 }}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

const statCardStyle = { backgroundColor: colors.backgroundCard, padding: '1.5rem', borderRadius: '12px', border: `1px solid ${colors.borderWarm}`, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' };
const statTitleStyle = { margin: 0, fontFamily: 'sans-serif', fontSize: '0.85rem', color: colors.textMuted, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px' };
const statValueStyle = { margin: '0.5rem 0 0.25rem 0', fontFamily: "'Georgia', serif", fontSize: '1.75rem', fontWeight: 500, color: colors.primary };
const modalBtnStyle = { width: '40px', height: '40px', borderRadius: '6px', border: `1px solid ${colors.borderWarm}`, backgroundColor: colors.backgroundWarm, fontSize: '1.2rem', cursor: 'pointer', color: colors.primary, fontWeight: 'bold' };