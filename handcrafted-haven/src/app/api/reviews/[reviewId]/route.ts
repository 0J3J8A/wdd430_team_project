// src/app/api/reviews/[reviewId]/route.ts
import { NextRequest, NextResponse } from "next/server";

// This would be imported from a database in production
// For now, we need to access the same mock data
// Note: In a real app, this would be shared via a database module
declare global {
  var _mockReviews: any[];
}

// Initialize mock reviews if not exists
if (!global._mockReviews) {
  global._mockReviews = [
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
}

function getMockReviews() {
  return global._mockReviews;
}

function saveMockReviews(reviews: any[]) {
  global._mockReviews = reviews;
}

// PUT /api/reviews/[reviewId]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    const { reviewId } = await params;
    const body = await request.json();
    const { rating, title, comment, userId } = body;

    const reviews = getMockReviews();
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    const existingReview = reviews[reviewIndex];

    // Optional: Check if user owns the review
    // if (existingReview.userId !== userId) {
    //   return NextResponse.json(
    //     { error: "Unauthorized to edit this review" },
    //     { status: 403 }
    //   );
    // }

    // Validation
    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (comment !== undefined && comment.length < 10) {
      return NextResponse.json(
        { error: "Comment must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update review
    const updatedReview = {
      ...existingReview,
      rating: rating !== undefined ? rating : existingReview.rating,
      title: title !== undefined ? title.trim() : existingReview.title,
      comment: comment !== undefined ? comment.trim() : existingReview.comment,
      updatedAt: new Date().toISOString(),
    };

    reviews[reviewIndex] = updatedReview;
    saveMockReviews(reviews);

    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[reviewId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    const { reviewId } = await params;

    const reviews = getMockReviews();
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId);

    if (reviewIndex === -1) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Remove review
    reviews.splice(reviewIndex, 1);
    saveMockReviews(reviews);

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}