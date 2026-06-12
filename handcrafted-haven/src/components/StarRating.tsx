// src/components/StarRating.tsx
"use client";

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "small" | "medium" | "large";
};

const sizeMap = {
  small: { gap: "0.125rem", star: "0.875rem" },
  medium: { gap: "0.25rem", star: "1.25rem" },
  large: { gap: "0.375rem", star: "1.5rem" },
};

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "medium",
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly && onRatingChange) {
      // Optional: preview rating on hover
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: sizeMap[size].gap,
      }}
    >
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <button
          key={`full-${i}`}
          onClick={() => handleClick(i + 1)}
          onMouseEnter={() => handleMouseEnter(i + 1)}
          disabled={readonly}
          style={{
            background: "none",
            border: "none",
            cursor: readonly ? "default" : "pointer",
            padding: 0,
            fontSize: sizeMap[size].star,
            color: "#D4A017",
            transition: "transform 0.1s ease",
          }}
          aria-label={`Rate ${i + 1} stars`}
        >
          ★
        </button>
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <button
          onClick={() => handleClick(fullStars + 0.5)}
          onMouseEnter={() => handleMouseEnter(fullStars + 0.5)}
          disabled={readonly}
          style={{
            background: "none",
            border: "none",
            cursor: readonly ? "default" : "pointer",
            padding: 0,
            fontSize: sizeMap[size].star,
            color: "#D4A017",
            transition: "transform 0.1s ease",
          }}
          aria-label={`Rate ${fullStars + 0.5} stars`}
        >
          ½
        </button>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <button
          key={`empty-${i}`}
          onClick={() => handleClick(fullStars + (hasHalfStar ? 1 : 0) + i + 1)}
          onMouseEnter={() => handleMouseEnter(fullStars + (hasHalfStar ? 1 : 0) + i + 1)}
          disabled={readonly}
          style={{
            background: "none",
            border: "none",
            cursor: readonly ? "default" : "pointer",
            padding: 0,
            fontSize: sizeMap[size].star,
            color: "#E0D0C0",
            transition: "transform 0.1s ease",
          }}
          aria-label={`Rate ${fullStars + (hasHalfStar ? 1 : 0) + i + 1} stars`}
        >
          ★
        </button>
      ))}
    </div>
  );
}