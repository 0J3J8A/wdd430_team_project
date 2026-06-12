// src/components/ReviewForm.tsx
"use client";

import { useState } from "react";
import StarRating from "./StarRating";

// TEMPORARY - Will be replaced by real auth from Card 09
// TODO: Replace with import { useAuth } from '@/contexts/AuthContext'
const IS_DEV_MODE = true;
const MOCK_USER = { id: "dev-user-1", name: "Test Shopper", initials: "TS" };

type ReviewFormProps = {
  productId: string;
  existingReview?: {
    id: string;
    rating: number;
    title: string;
    comment: string;
  };
  isEditing?: boolean;
  onSubmit: (data: {
    rating: number;
    title: string;
    comment: string;
    reviewId?: string;
  }) => Promise<void>;
  onCancel?: () => void;
};

export default function ReviewForm({
  productId,
  existingReview,
  isEditing = false,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [title, setTitle] = useState(existingReview?.title || "");
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    rating?: string;
    title?: string;
    comment?: string;
  }>({});

  // Validation
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    if (!title.trim()) {
      newErrors.title = "Review title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!comment.trim()) {
      newErrors.comment = "Review comment is required";
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Comment must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        rating,
        title: title.trim(),
        comment: comment.trim(),
        reviewId: existingReview?.id,
      });

      // Reset form if not editing
      if (!isEditing) {
        setRating(0);
        setTitle("");
        setComment("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#FAF7F4",
        borderRadius: "12px",
        padding: "1.5rem",
        border: "0.5px solid #E0D0C0",
        marginBottom: "2rem",
      }}
    >
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "1.1rem",
          fontWeight: 500,
          color: "#5C4033",
          margin: "0 0 1rem 0",
        }}
      >
        {isEditing ? "Edit Your Review" : "Write a Review"}
      </h3>

      {/* Rating field */}
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            fontFamily: "sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#5C4033",
            marginBottom: "0.5rem",
          }}
        >
          Rating *
        </label>
        <StarRating rating={rating} onRatingChange={setRating} size="large" />
        {errors.rating && (
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "0.75rem",
              color: "#A0785A",
              marginTop: "0.25rem",
            }}
          >
            {errors.rating}
          </p>
        )}
      </div>

      {/* Title field */}
      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            fontFamily: "sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#5C4033",
            marginBottom: "0.5rem",
          }}
          htmlFor="review-title"
        >
          Review Title *
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: `1px solid ${errors.title ? "#A0785A" : "#E0D0C0"}`,
            fontFamily: "sans-serif",
            fontSize: "0.9rem",
            backgroundColor: "#FFFFFF",
          }}
        />
        {errors.title && (
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "0.75rem",
              color: "#A0785A",
              marginTop: "0.25rem",
            }}
          >
            {errors.title}
          </p>
        )}
      </div>

      {/* Comment field */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label
          style={{
            display: "block",
            fontFamily: "sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#5C4033",
            marginBottom: "0.5rem",
          }}
          htmlFor="review-comment"
        >
          Your Review *
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like or dislike about this product? (minimum 10 characters)"
          rows={4}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: `1px solid ${errors.comment ? "#A0785A" : "#E0D0C0"}`,
            fontFamily: "sans-serif",
            fontSize: "0.9rem",
            backgroundColor: "#FFFFFF",
            resize: "vertical",
          }}
        />
        {errors.comment && (
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "0.75rem",
              color: "#A0785A",
              marginTop: "0.25rem",
            }}
          >
            {errors.comment}
          </p>
        )}
      </div>

      {/* Form actions */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "flex-end",
        }}
      >
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: "transparent",
              color: "#A0785A",
              padding: "0.6rem 1.25rem",
              borderRadius: "8px",
              border: "1px solid #E0D0C0",
              cursor: "pointer",
              fontFamily: "sans-serif",
              fontSize: "0.85rem",
            }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: "#4A6741",
            color: "#FAF7F4",
            padding: "0.6rem 1.25rem",
            borderRadius: "8px",
            border: "none",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontFamily: "sans-serif",
            fontSize: "0.85rem",
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Submitting..."
            : isEditing
            ? "Update Review"
            : "Submit Review"}
        </button>
      </div>

      {/* Temporary auth notice */}
      <div
        style={{
          marginTop: "1rem",
          paddingTop: "0.75rem",
          borderTop: "0.5px solid #E0D0C0",
          fontSize: "0.7rem",
          fontFamily: "sans-serif",
          color: "#A0785A",
          textAlign: "center",
        }}
      >
        {/* TODO: Replace with real auth from Card 09 */}
        <span>Development mode - Review will be saved to mock API</span>
      </div>
    </form>
  );
}