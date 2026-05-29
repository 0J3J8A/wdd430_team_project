// lib/artisans.ts
// Data access layer for artisan data.
//
// ── How to wire this to your database ──────────────────────────────────────
// This file currently uses a local mock so the page renders without a backend.
// When your team adds Prisma / Drizzle / another ORM, replace the two
// functions below with real queries.  The page component stays identical.
//
// Example with Prisma:
//   import { prisma } from '@/lib/prisma'
//   export async function getArtisanBySlug(slug: string) {
//     return prisma.artisan.findUnique({ where: { slug } })
//   }
// ───────────────────────────────────────────────────────────────────────────

import type { Artisan, Product } from "@/types";

// ── Mock data (replace with DB queries) ────────────────────────────────────

const ARTISANS: Artisan[] = [
  {
    id: "1",
    slug: "maria-santos",
    name: "Maria Santos",
    specialty: "Ceramics & Pottery",
    location: "Oaxaca, Mexico",
    profileImage: "",   // empty = show initials avatar
    initials: "MS",
    biography: `I discovered the wheel in my grandmother's courtyard when I was seven years old. She never taught me formally — I simply watched her hands for years until the clay began to speak to me too.

After studying fine arts in Mexico City, I returned to Oaxaca determined to carry forward the Zapotec ceramic tradition while making it my own. Each piece I throw carries the weight of that history: the mineral-rich Oaxacan clay, the wood-fired glazes mixed by hand, the slow drying under the valley sun.

My work is not mass-produced. A single bowl may take three weeks from raw clay to finished piece. I believe that patience leaves a fingerprint on an object that the person who eventually holds it can feel, even if they can't name it. That invisible transfer — from maker to owner — is why I make things.`,
    memberSince: "2024-01",
    socialLinks: {
      instagram: "https://instagram.com",
      etsy: "https://etsy.com",
      website: "https://example.com",
    },
    productCount: 12,
    averageRating: 4.9,
    reviewCount: 87,
  },
  {
    id: "2",
    slug: "juan-aguirre",
    name: "Juan Aguirre",
    specialty: "Silversmithing",
    location: "San José, Costa Rica",
    profileImage: "",
    initials: "JA",
    biography: `Every piece of jewelry I create starts with a story — a love letter, a milestone, a memory. I hand-forge each item using traditional silversmithing techniques passed down through three generations of my family.

I trained under my father, who trained under his. The tools on my bench are older than I am. But my designs are contemporary: I'm interested in the tension between the ancient process and the modern moment, between permanence and impermanence.

I work exclusively with recycled silver and ethically sourced stones. When you wear one of my pieces, I want you to know exactly where every component came from and who shaped it.`,
    memberSince: "2024-03",
    socialLinks: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
    productCount: 8,
    averageRating: 4.8,
    reviewCount: 54,
  },
  {
    id: "3",
    slug: "ana-toledo",
    name: "Ana Toledo",
    specialty: "Textile Weaving",
    location: "Guatemala City, Guatemala",
    profileImage: "",
    initials: "AT",
    biography: `Weaving is how my family has communicated for generations. The patterns are a language — every color and motif carries meaning that words sometimes can't hold. I learned on a backstrap loom before I could read.

I use natural dyes exclusively: indigo, cochineal, marigold, and bark tannins gathered from the highlands around my studio. The colors shift slightly with every batch. That's not imperfection — that's the living quality of natural materials.

My mission is twofold: to make textiles beautiful enough that people genuinely want to live with them, and to ensure my nieces and their daughters have a craft worth inheriting.`,
    memberSince: "2024-06",
    socialLinks: {
      instagram: "https://instagram.com",
      etsy: "https://etsy.com",
    },
    productCount: 15,
    averageRating: 5.0,
    reviewCount: 112,
  },
];

const PRODUCTS: Product[] = [
  // Maria Santos
  { id: "p1", artisanId: "1", name: "Hand-Thrown Clay Bowl", description: "Wide-rimmed stoneware bowl, food-safe glaze, dishwasher safe. Each piece varies slightly in color.", price: 48, category: "Ceramics", icon: "🏺", inStock: true, rating: 5.0, reviewCount: 23 },
  { id: "p2", artisanId: "1", name: "Terracotta Vase",        description: "Tall slip-cast vase with matte terracotta glaze. Perfect for dried botanicals.", price: 72, category: "Ceramics", icon: "🏺", inStock: true, rating: 4.9, reviewCount: 18 },
  { id: "p3", artisanId: "1", name: "Ceramic Mug Set",        description: "Set of two wheel-thrown mugs, 12oz each. Speckled cream glaze with walnut rim.", price: 55, category: "Ceramics", icon: "🏺", inStock: false, rating: 4.8, reviewCount: 31 },
  { id: "p4", artisanId: "1", name: "Stoneware Planter",      description: "Drainage-hole planter for 4\" plants. Slab-built with a sage green reactive glaze.", price: 38, category: "Ceramics", icon: "🪴", inStock: true, rating: 4.9, reviewCount: 15 },

  // Juan Aguirre
  { id: "p5", artisanId: "2", name: "Silver Leaf Earrings",  description: "Oxidized sterling silver, hammered texture, hypoallergenic ear wires. 4cm drop.", price: 65, category: "Jewelry", icon: "💍", inStock: true, rating: 5.0, reviewCount: 19 },
  { id: "p6", artisanId: "2", name: "Hammered Band Ring",    description: "Recycled sterling silver. Available in sizes 5–12. Each ring is unique.", price: 90, category: "Jewelry", icon: "💍", inStock: true, rating: 4.7, reviewCount: 22 },
  { id: "p7", artisanId: "2", name: "Chain Necklace",        description: "Hand-linked 18\" chain with a small hammered pendant. Lobster clasp.", price: 110, category: "Jewelry", icon: "💍", inStock: true, rating: 4.9, reviewCount: 13 },

  // Ana Toledo
  { id: "p8",  artisanId: "3", name: "Woven Wall Hanging", description: "Natural-dye cotton on driftwood dowel. 60cm × 45cm. Each piece is one-of-a-kind.", price: 120, category: "Textiles", icon: "🧵", inStock: true, rating: 5.0, reviewCount: 41 },
  { id: "p9",  artisanId: "3", name: "Handwoven Tote Bag", description: "Market tote in striped cotton. Reinforced handles, interior pocket. 38cm × 42cm.", price: 68, category: "Textiles", icon: "🧵", inStock: true, rating: 4.9, reviewCount: 28 },
  { id: "p10", artisanId: "3", name: "Table Runner",        description: "90cm × 35cm. Indigo and natural cotton. Machine washable on gentle cycle.", price: 45, category: "Textiles", icon: "🧵", inStock: true, rating: 5.0, reviewCount: 33 },
  { id: "p11", artisanId: "3", name: "Cushion Cover",       description: "45cm × 45cm. Zip closure. Fits standard inserts. Geometric pattern in cochineal red.", price: 52, category: "Textiles", icon: "🧵", inStock: false, rating: 4.8, reviewCount: 10 },
];

// ── Query functions ─────────────────────────────────────────────────────────

/**
 * Fetch a single artisan by their URL slug.
 * Returns null if not found (triggers notFound() in the page).
 */
export async function getArtisanBySlug(slug: string): Promise<Artisan | null> {
  // Replace with: return prisma.artisan.findUnique({ where: { slug } })
  return ARTISANS.find((a) => a.slug === slug) ?? null;
}

/**
 * Fetch all products listed by a given artisan ID.
 */
export async function getProductsByArtisanId(artisanId: string): Promise<Product[]> {
  // Replace with: return prisma.product.findMany({ where: { artisanId } })
  return PRODUCTS.filter((p) => p.artisanId === artisanId);
}

/**
 * Fetch all artisan slugs — used by generateStaticParams to pre-render pages.
 */
export async function getAllArtisanSlugs(): Promise<string[]> {
  // Replace with: return (await prisma.artisan.findMany({ select: { slug: true } })).map(a => a.slug)
  return ARTISANS.map((a) => a.slug);
}