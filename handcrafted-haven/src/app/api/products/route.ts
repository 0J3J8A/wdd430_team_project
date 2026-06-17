// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";

const art1 = "ea24b1f7-85ec-4818-83d9-35982a0de689"; //Just for check seller dashboard
const mockProducts: Record<string, any> = {
  "1": {
    id: "1",
    name: "Hand-Thrown Clay Bowl",
    description: "This beautiful hand-thrown clay bowl is crafted using traditional techniques passed down through generations. Each bowl is unique, featuring natural variations in color and texture that tell the story of its creation. Perfect for serving soups, salads, or as a decorative piece in your home.",
    price: 48.00,
    currency: "USD",
    availabilityStatus: "in_stock",
    stockQuantity: 15,
    images: [
      { id: "img1", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiUmOrg74rlOcWQNxp3cjR16TbaPwL9xLY8g&s", alt: "Hand-thrown clay bowl front view", isMain: true },
      { id: "img2", url: "https://i.etsystatic.com/8740835/r/il/a20801/5046245558/il_570xN.5046245558_1qki.jpg", alt: "Clay bowl side view", isMain: false },
      { id: "img3", url: "https://nataliawillmott.co.uk/cdn/shop/products/hand-thrown-stoneware-bowl-698593.jpg?v=1695999017", alt: "Clay bowl texture detail", isMain: false },
    ],
    artisan: {
      id: art1,
      name: "Maria Santos",
      location: "Oaxaca, Mexico",
      specialty: "Ceramics & Pottery",
      avatarInitials: "MS",
    },
    reviews: [
      { id: "rev1", author: "Sophie L.", rating: 5, comment: "Absolutely beautiful bowl! You can really feel the quality and care that went into making it.", date: "2025-01-15" },
      { id: "rev2", author: "Michael R.", rating: 4, comment: "Gorgeous craftsmanship. The color is exactly as shown.", date: "2025-01-10" },
    ],
    averageRating: 4.5,
    reviewCount: 2,
  },
  "2": {
    id: "2",
    name: "Terracotta Vase",
    description: "Elegant terracotta vase hand-thrown by Maria Santos. Perfect for displaying dried flowers or as a standalone decorative piece. The warm earthy tones complement any home decor.",
    price: 72.00,
    currency: "USD",
    availabilityStatus: "in_stock",
    stockQuantity: 8,
    images: [
      { id: "img1", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4oBJOziCPJwzIOBiUUL1UgzjO0nGGxKqNVA&s", alt: "Terracotta vase front view", isMain: true },
      { id: "img2", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWJZRyBJYJcAIB4ZUgUx7XgeuAY2U_-QGNw&s", alt: "Vase side view", isMain: false },
    ],
    artisan: {
      id: art1,
      name: "Maria Santos",
      location: "Oaxaca, Mexico",
      specialty: "Ceramics & Pottery",
      avatarInitials: "MS",
    },
    reviews: [
      { id: "rev3", author: "Emma W.", rating: 5, comment: "Stunning vase! Looks exactly like the photos.", date: "2025-02-01" },
    ],
    averageRating: 5.0,
    reviewCount: 1,
  },
  "3": {
    id: "3",
    name: "Ceramic Mug Set",
    description: "Set of 4 handcrafted ceramic mugs. Each mug is uniquely shaped and glazed, making every piece one-of-a-kind. Microwave and dishwasher safe.",
    price: 55.00,
    currency: "USD",
    availabilityStatus: "low_stock",
    stockQuantity: 4,
    images: [
      { id: "img1", url: "https://m.media-amazon.com/images/I/61ZrifSKbrL._AC_UF894,1000_QL80_.jpg", alt: "Ceramic mug set", isMain: true },
      { id: "img2", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SFcFEfl-1675YHFOoOp5jiPpWoWyF330KA&s", alt: "Mug close up", isMain: false },
      { id: "img3", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-hBr27N7MJ4CFlsnVRBZRhxHp1FMSi0tIPA&s", alt: "Mugs stacked", isMain: false },
    ],
    artisan: {
      id: art1,
      name: "Maria Santos",
      location: "Oaxaca, Mexico",
      specialty: "Ceramics & Pottery",
      avatarInitials: "MS",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
  },
  "4": {
    id: "4",
    name: "Silver Leaf Earrings",
    description: "Hand-forged silver leaf earrings inspired by the tropical forests of Costa Rica. Each pair is uniquely crafted using traditional silversmithing techniques. Hypoallergenic and lightweight for all-day comfort.",
    price: 65.00,
    currency: "USD",
    availabilityStatus: "low_stock",
    stockQuantity: 3,
    images: [
      { id: "img1", url: "https://burnishjewelry.com/cdn/shop/products/4f144818ba244f18851cd7086b1731ff.thumbnail.0000000000_1024x1024.jpg?v=1665266916", alt: "Silver leaf earrings on display", isMain: true },
      { id: "img2", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIVpRwQ_FUNo_cgFmfwIDCSeJwasX_LG_lUA&s", alt: "Earrings close up", isMain: false },
      { id: "img3", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfEcFwkLrBjm9Wy5kz5hbdbxcMGNUpf4o2SA&s", alt: "Earrings being worn", isMain: false },
    ],
    artisan: {
      id: "art2",
      name: "Juan Aguirre",
      location: "San Jose, Costa Rica",
      specialty: "Silversmithing",
      avatarInitials: "JA",
    },
    reviews: [
      { id: "rev4", author: "Laura B.", rating: 5, comment: "These earrings are exquisite! The silver work is impeccable.", date: "2025-01-20" },
      { id: "rev5", author: "David K.", rating: 4, comment: "Beautiful design. Very light and comfortable to wear.", date: "2025-01-18" },
    ],
    averageRating: 4.5,
    reviewCount: 2,
  },
  "5": {
    id: "5",
    name: "Hammered Ring",
    description: "Hand-hammered sterling silver ring with a unique textured finish. Each ring is individually crafted, making every piece unique. Adjustable design fits most finger sizes.",
    price: 90.00,
    currency: "USD",
    availabilityStatus: "in_stock",
    stockQuantity: 12,
    images: [
      { id: "img1", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQu5YX_WCCIg37KskzWgZK7a9lBxvsYCeDOA&s", alt: "Hammered ring on hand", isMain: true },
      { id: "img2", url: "https://forgeandlumber.com/cdn/shop/files/b63d705e-0bc8-4b4c-98a8-3d59518ca3d8.jpg?v=1706702688&width=533", alt: "Ring detail", isMain: false },
    ],
    artisan: {
      id: "art2",
      name: "Juan Aguirre",
      location: "San Jose, Costa Rica",
      specialty: "Silversmithing",
      avatarInitials: "JA",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
  },
  "6": {
    id: "6",
    name: "Chain Necklace",
    description: "Elegant handcrafted silver chain necklace. Each link is individually soldered by hand, creating a strong and beautiful piece. Available in two lengths: 16 and 18 inches.",
    price: 110.00,
    currency: "USD",
    availabilityStatus: "in_stock",
    stockQuantity: 7,
    images: [
      { id: "img1", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRYP93L7GQH87J9wJPfNN0r6vZOjAk73A7RQ&s", alt: "Chain necklace on display", isMain: true },
      { id: "img2", url: "https://i.etsystatic.com/43246228/c/1906/1906/37/269/il/8d3144/7535622737/il_340x270.7535622737_8g2o.jpg", alt: "Necklace chain detail", isMain: false },
      { id: "img3", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuBMyZEx-4uxFPNGMYqBG9PsC7n2jm1cDn2g&s", alt: "Necklace being worn", isMain: false },
    ],
    artisan: {
      id: "art2",
      name: "Juan Aguirre",
      location: "San Jose, Costa Rica",
      specialty: "Silversmithing",
      avatarInitials: "JA",
    },
    reviews: [
      { id: "rev6", author: "Sarah M.", rating: 5, comment: "Absolutely stunning necklace. The craftsmanship is outstanding!", date: "2025-02-05" },
    ],
    averageRating: 5.0,
    reviewCount: 1,
  },
  "7": {
    id: "7",
    name: "Woven Wall Hanging",
    description: "Handwoven wall hanging created on a traditional backstrap loom. Made with natural dyes and organic cotton. Each piece tells a story of Guatemalan heritage and craftsmanship.",
    price: 120.00,
    currency: "USD",
    availabilityStatus: "in_stock",
    stockQuantity: 5,
    images: [
      { id: "img1", url: "https://m.media-amazon.com/images/I/71EN7JSGsiL.jpg", alt: "Woven wall hanging on wall", isMain: true },
      { id: "img2", url: "https://graceandashes.co.uk/cdn/shop/products/large-macrame-tapestry-4887790.jpg?v=1756298347", alt: "Weaving detail close up", isMain: false },
      { id: "img3", url: "https://i.etsystatic.com/32768078/r/il/a9a9d8/7083648984/il_570xN.7083648984_5847.jpg", alt: "Artisan weaving process", isMain: false },
    ],
    artisan: {
      id: "art3",
      name: "Ana Toledo",
      location: "Guatemala City",
      specialty: "Textile Weaving",
      avatarInitials: "AT",
    },
    reviews: [
      { id: "rev7", author: "Jessica P.", rating: 5, comment: "This wall hanging transformed my living room. So beautiful!", date: "2025-01-25" },
      { id: "rev8", author: "Thomas R.", rating: 5, comment: "Incredible quality. You can see the care in every thread.", date: "2025-01-22" },
    ],
    averageRating: 5.0,
    reviewCount: 2,
  },
  "8": {
    id: "8",
    name: "Handwoven Tote",
    description: "Durable handwoven tote bag perfect for daily use. Made with traditional techniques and sustainable materials. Features an interior pocket and leather straps.",
    price: 68.00,
    currency: "USD",
    availabilityStatus: "low_stock",
    stockQuantity: 2,
    images: [
      { id: "img1", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgDflnf0V7Fn4Th42qLtJC6Inltt_taYfBAA&s", alt: "Handwoven tote bag", isMain: true },
      { id: "img2", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBv0BHc8pY91yg0KqOog5qbxxkjjQJMZRWRQ&s", alt: "Tote bag interior", isMain: false },
    ],
    artisan: {
      id: "art3",
      name: "Ana Toledo",
      location: "Guatemala City",
      specialty: "Textile Weaving",
      avatarInitials: "AT",
    },
    reviews: [],
    averageRating: 0,
    reviewCount: 0,
  },
  "9": {
    id: "9",
    name: "Table Runner",
    description: "Beautifully woven table runner in traditional patterns. Perfect for special occasions or everyday use. Machine washable and fade-resistant colors.",
    price: 45.00,
    currency: "USD",
    availabilityStatus: "in_stock",
    stockQuantity: 10,
    images: [
      { id: "img1", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT66BnaqE7Ytj8DKLLJ_fsNMc0fSHvmBbssoQ&s", alt: "Table runner on table", isMain: true },
      { id: "img2", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKXnlnDNKHWZvyDbxJ0f6ep9WWydqfM24Bg&s", alt: "Runner pattern detail", isMain: false },
    ],
    artisan: {
      id: "art3",
      name: "Ana Toledo",
      location: "Guatemala City",
      specialty: "Textile Weaving",
      avatarInitials: "AT",
    },
    reviews: [
      { id: "rev9", author: "Olivia C.", rating: 4, comment: "Lovely colors and craftsmanship. Adds warmth to my dining table.", date: "2025-02-10" },
    ],
    averageRating: 4.0,
    reviewCount: 1,
  },
};

export async function GET() {
  return NextResponse.json(Object.values(mockProducts));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newId = String(Object.keys(mockProducts).length + 1);
    
    mockProducts[newId] = {
      id: newId,
      ...body,
      currency: "USD",
      availabilityStatus: body.stockQuantity > 0 ? "in_stock" : "out_of_stock",
      reviews: [],
      averageRating: 0,
      reviewCount: 0
    };

    return NextResponse.json({ success: true, product: mockProducts[newId] }, { status: 201 });
  } catch (error) {
    console.error("Error creating product in mock API:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}