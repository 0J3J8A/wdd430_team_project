'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const colors = {
  primary:         '#5C4033',
  secondary:      '#A0785A',
  accent:         '#4A6741',
  background:     '#FAF7F4',
  backgroundCard: '#FFFFFF',
  borderWarm:     '#D4C4B8',
  textMuted:      '#7A6055',
};

const typography = {
  h2: { fontFamily: "'Georgia', serif", fontSize: '2rem', fontWeight: 500, color: '#5C4033' },
  subheading: { fontFamily: 'sans-serif', fontSize: '1rem', color: '#A0785A' },
  label: { fontFamily: 'sans-serif', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' as const, color: '#5C4033', display: 'block', marginBottom: '0.5rem' },
};

const EXISTING_CATEGORIES = ['Ceramics', 'Textiles', 'Jewelry', 'Woodwork', 'Candles', 'Paintings'];

export default function CreateProductPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;

    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validFormats.includes(file.type)) {
      setError('Invalid format. Only JPEG and PNG are supported.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setImage(null);
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File is too large. Maximum size allowed is 5MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setImage(null);
      return;
    }

    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !price || !category || !image) {
      setError('All fields, including the product image, are mandatory.');
      return;
    }

    try {
      const localImageUrl = URL.createObjectURL(image);

      const productBody = {
        name: title,
        description,
        price: parseFloat(price),
        stockQuantity: 12, 
        category,
        images: [
          { id: `img-${Date.now()}`, url: localImageUrl, alt: title, isMain: true }
        ],
        artisan: {
          id: user?.id || "art1",
          name: user?.name || "Artisan Maker",
          location: "Workshop Studio",
          specialty: category,
          avatarInitials: user?.name 
            ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2) 
            : "AM"
        }
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productBody),
      });

      if (!response.ok) {
        throw new Error('Failed to register the product in the gallery.');
      }

      setSuccess(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError('We could not save your product at this time. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/seller/dashboard');
  };

  return (
    <main style={{ backgroundColor: colors.background, minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem', backgroundColor: colors.backgroundCard, borderRadius: '16px', border: `1px solid ${colors.borderWarm}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ ...typography.h2, marginBottom: '0.5rem' }}>List a New Product</h2>
        <p style={{ ...typography.subheading, marginBottom: '2rem' }}>Fill in the details to publish your craftwork as active in the shop.</p>

        {success ? (
          <div style={{ backgroundColor: '#E6F4EA', color: colors.accent, padding: '2rem', borderRadius: '12px', textAlign: 'center', fontWeight: 600, fontFamily: 'sans-serif' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>🎉</span>
            Product listed successfully as ACTIVE!
            <button onClick={() => router.push('/seller/dashboard')} style={{ marginTop: '1.5rem', backgroundColor: colors.accent, color: '#fff', padding: '0.5rem 1.5rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
              Go to Seller Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {error && (
              <div style={{ backgroundColor: '#FDF2F2', color: '#D9534F', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 500, border: '1px solid #F3B2B2', fontFamily: 'sans-serif' }}>
                ⚠️ {error}
              </div>
            )}

            <div>
              <label htmlFor="title" style={typography.label}>Product Title *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Handcrafted Clay Vase"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${colors.borderWarm}`, outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label htmlFor="category" style={typography.label}>Category *</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${colors.borderWarm}`, backgroundColor: '#fff', outline: 'none', fontSize: '1rem', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="">Select a category</option>
                {EXISTING_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price" style={typography.label}>Price (USD) *</label>
              <input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${colors.borderWarm}`, outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label htmlFor="description" style={typography.label}>Description *</label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell shoppers the story behind this item..."
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: `1px solid ${colors.borderWarm}`, outline: 'none', fontSize: '1rem', resize: 'vertical', fontFamily: 'sans-serif', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label htmlFor="image-upload" style={typography.label}>Product Image * (JPEG, PNG - Max 5MB)</label>
              <input
                id="image-upload"
                type="file"
                accept=".jpg,.jpeg,.png"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ width: '100%', padding: '0.5rem 0', fontSize: '0.9rem', color: colors.textMuted, fontFamily: 'sans-serif' }}
              />
              {image && (
                <p style={{ fontSize: '0.85rem', color: colors.accent, marginTop: '0.25rem', fontFamily: 'sans-serif', fontWeight: 600 }}>
                  ✓ {image.name} ({(image.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{ flex: 1, padding: '0.85rem', borderRadius: '8px', border: `1px solid ${colors.primary}`, backgroundColor: 'transparent', color: colors.primary, fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ flex: 1, padding: '0.85rem', borderRadius: '8px', border: 'none', backgroundColor: colors.primary, color: colors.background, fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
              >
                Submit Product
              </button>
            </div>

          </form>
        )}
      </div>
    </main>
  );
}