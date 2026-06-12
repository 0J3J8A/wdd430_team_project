// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from "next/server";

// Mock review storage (in memory - will reset on server restart)
// In production, this would be a database
let mockReviews: any[] = [
  {
    id: "review-1",
    productId: "1",
    userId: "user-1",
    userName: "Sophie L.",
    userInitials: "SL",
    rating: 5,
    title: "Absolutely beautiful!",
    comment: "The ceramic bowl I ordered is even more beautiful in person. You can feel the love in every curve. Highly recommend!",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "review-2",
    productId: "1",
    userId: "user-2",
    userName: "Michael R.",
    userInitials: "MR",
    rating: 4,
    title: "Great craftsmanship",
    comment: "Gorgeous craftsmanship. The color is exactly as shown. Would buy again.",
    createdAt: "2025-01-10T14:30:00Z",
    updatedAt: "2025-01-10T14:30:00Z",
  },
  {
    id: "review-3",
    productId: "4",
    userId: "user-1",
    userName: "Sophie L.",
    userInitials: "SL",
    rating: 5,
    title: "Stunning earrings",
    comment: "These earrings are exquisite! The silver work is impeccable and they're very comfortable to wear.",
    createdAt: "2025-01-20T09:15:00Z",
    updatedAt: "2025-01-20T09:15:00Z",
  },
];

// Helper to generate new ID
function generateId(): string {
  return `review-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}

// GET /api/reviews?productId=xxx
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 }
    );
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const productReviews = mockReviews
    .filter((review) => review.productId === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Calculate average rating
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = productReviews.length > 0 ? totalRating / productReviews.length : 0;

  return NextResponse.json({
    reviews: productReviews,
    averageRating,
    totalReviews: productReviews.length,
  });
}

// POST /api/reviews
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, rating, title, comment, userId, userName, userInitials } = body;

    // Validation
    if (!productId || !rating || !title || !comment) {
      return NextResponse.json(
        { error: "Missing required fields: productId, rating, title, comment" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (comment.length < 10) {
      return NextResponse.json(
        { error: "Comment must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Check for duplicate review from same user
    const existingReview = mockReviews.find(
      (r) => r.productId === productId && r.userId === userId
    );

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 409 }
      );
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create new review
    const newReview = {
      id: generateId(),
      productId,
      userId: userId || "dev-user-1",
      userName: userName || "Test Shopper",
      userInitials: userInitials || "TS",
      rating,
      title: title.trim(),
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockReviews.push(newReview);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}