// src/components/ReviewsList.tsx
"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import type { Review } from "@/types";

// TEMPORARY - Will be replaced by real auth from Card 09
const MOCK_USER_ID = "dev-user-1";

type ReviewsListProps = {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  isLoading: boolean;
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => Promise<void>;
  // TEMPORARY: Current user ID for edit/delete permissions
  currentUserId?: string;
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function ReviewsList({
  reviews,
  averageRating,
  totalReviews,
  isLoading,
  onEditReview,
  onDeleteReview,
  currentUserId = MOCK_USER_ID,
}: ReviewsListProps) {
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  const handleDelete = async (reviewId: string) => {
    if (!onDeleteReview) return;
    
    if (confirm("Are you sure you want to delete this review?")) {
      setDeletingReviewId(reviewId);
      try {
        await onDeleteReview(reviewId);
      } finally {
        setDeletingReviewId(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid #EDE0D4",
            borderTopColor: "#5C4033",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style jsx global>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#FAF7F4",
          borderRadius: "12px",
          border: "0.5px solid #E0D0C0",
        }}
      >
        <p
          style={{
            fontFamily: "sans-serif",
            color: "#7A6055",
            margin: 0,
          }}
        >
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <StarRating rating={averageRating} readonly={true} size="large" />
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
              color: "#5C4033",
              fontWeight: 600,
            }}
          >
            {averageRating.toFixed(1)}
          </span>
        </div>
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.85rem",
            color: "#A0785A",
          }}
        >
          Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </span>
      </div>

      {/* Reviews list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {reviews.map((review) => {
          const isOwner = review.userId === currentUserId;
          const isDeleting = deletingReviewId === review.id;

          return (
            <div
              key={review.id}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                padding: "1.25rem",
                border: "0.5px solid #E0D0C0",
              }}
            >
              {/* Header: user info and date */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#5C4033",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FAF7F4",
                      fontFamily: "sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    {review.userInitials}
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "sans-serif",
                        fontWeight: 600,
                        color: "#5C4033",
                        fontSize: "0.95rem",
                        display: "block",
                      }}
                    >
                      {review.userName}
                    </span>
                    <span
                      style={{
                        fontFamily: "sans-serif",
                        fontSize: "0.75rem",
                        color: "#A0785A",
                      }}
                    >
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Edit/Delete buttons for owner */}
                {isOwner && onEditReview && onDeleteReview && (
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      onClick={() => onEditReview(review)}
                      disabled={isDeleting}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: isDeleting ? "not-allowed" : "pointer",
                        padding: "0.25rem 0.5rem",
                        fontSize: "0.8rem",
                        color: "#4A6741",
                        fontFamily: "sans-serif",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={isDeleting}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: isDeleting ? "not-allowed" : "pointer",
                        padding: "0.25rem 0.5rem",
                        fontSize: "0.8rem",
                        color: "#A0785A",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {isDeleting ? "..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>

              {/* Review content */}
              <StarRating rating={review.rating} readonly={true} size="small" />
              <h4
                style={{
                  fontFamily: "'Georgia', serif",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "#5C4033",
                  margin: "0.5rem 0 0.5rem 0",
                }}
              >
                {review.title}
              </h4>
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "0.9rem",
                  color: "#7A6055",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {review.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}