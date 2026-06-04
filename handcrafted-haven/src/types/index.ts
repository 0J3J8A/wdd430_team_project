// types/index.ts
// Shared TypeScript interfaces for Handcrafted Haven.
// These reflect the database schema described in the user story.

export interface SocialLinks {
  instagram?: string;
  etsy?: string;
  website?: string;
}

export interface Artisan {
  id: string;
  slug: string;           // URL-safe identifier e.g. "maria-santos"
  name: string;
  specialty: string;      // e.g. "Ceramics & Pottery"
  location: string;
  biography: string;      // Long-form story / about text
  profileImage: string;   // URL or initials fallback key
  initials: string;       // Used when no image is available
  memberSince: string;    // ISO date string e.g. "2024-03"
  socialLinks: SocialLinks;
  productCount: number;
  averageRating: number;
  reviewCount: number;
}

export interface Product {
  id: string;
  artisanId: string;
  name: string;
  description: string;
  price: number;          // stored in dollars
  category: string;
  icon: string;           // emoji placeholder until real images exist
  inStock: boolean;
  rating: number;
  reviewCount: number;
}