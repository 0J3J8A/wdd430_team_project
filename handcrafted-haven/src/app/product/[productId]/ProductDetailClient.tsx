// src/app/product/[productId]/ProductDetailClient.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

// Type definitions for product data
type ProductImage = {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
};

type Artisan = {
  id: string;
  name: string;
  location: string;
  specialty: string;
  avatarInitials: string;
};

type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

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
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
};

// Helper function to format price
const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
};

// Helper function to get availability text and color
const getAvailabilityInfo = (status: Product["availabilityStatus"], quantity: number) => {
  switch (status) {
    case "in_stock":
      return { text: "In Stock", color: "#4A6741", subtitle: `${quantity} available` };
    case "low_stock":
      return { text: "Low Stock", color: "#D4A017", subtitle: `Only ${quantity} left` };
    case "out_of_stock":
      return { text: "Out of Stock", color: "#A0785A", subtitle: "Check back soon" };
    default:
      return { text: "In Stock", color: "#4A6741", subtitle: "" };
  }
};

// Loading skeleton component
const LoadingSkeleton = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
        {/* Image gallery skeleton */}
        <div>
          <div style={{
            width: "100%",
            aspectRatio: "1/1",
            backgroundColor: "#EDE0D4",
            borderRadius: "12px",
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#EDE0D4",
                borderRadius: "8px",
                animation: "pulse 1.5s ease-in-out infinite",
              }} />
            ))}
          </div>
        </div>
        {/* Product info skeleton */}
        <div>
          <div style={{
            height: "32px",
            width: "80%",
            backgroundColor: "#EDE0D4",
            borderRadius: "4px",
            marginBottom: "1rem",
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
          <div style={{
            height: "24px",
            width: "40%",
            backgroundColor: "#EDE0D4",
            borderRadius: "4px",
            marginBottom: "1rem",
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
          <div style={{
            height: "100px",
            width: "100%",
            backgroundColor: "#EDE0D4",
            borderRadius: "4px",
            marginBottom: "1rem",
            animation: "pulse 1.5s ease-in-out infinite",
          }} />
        </div>
      </div>
    </div>
  );
};

// Error component
const ErrorDisplay = ({ message, onRetry }: { message: string; onRetry: () => void }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      textAlign: "center",
      padding: "2rem",
    }}>
      <div style={{
        fontSize: "3rem",
        marginBottom: "1rem",
      }}>⚠️</div>
      <h2 style={{ fontFamily: "'Georgia', serif", color: "#5C4033", marginBottom: "0.5rem" }}>
        Something went wrong
      </h2>
      <p style={{ fontFamily: "sans-serif", color: "#7A6055", marginBottom: "1.5rem" }}>
        {message}
      </p>
      <button
        onClick={onRetry}
        style={{
          backgroundColor: "#5C4033",
          color: "#FAF7F4",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontFamily: "sans-serif",
        }}
      >
        Try Again
      </button>
    </div>
  );
};

// Main Client Component
type ProductDetailClientProps = {
  productId: string;
};

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart(); // ADDED: Cart context hook
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addToCartMessage, setAddToCartMessage] = useState<string | null>(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your actual API endpoint
        // For now, using mock data since backend may not be ready
        const response = await fetch(`/api/products/${productId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Handle add to cart - MODIFIED to use CartContext
  const handleAddToCart = () => {
    if (!product) return;

    setAddingToCart(true);
    setAddToCartMessage(null);

    // Create cart item from product data
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      quantity: 1,
      imageUrl: product.images.find(img => img.isMain)?.url || product.images[0]?.url || "",
      artisanName: product.artisan.name,
    };

    // Add to cart using context
    addToCart(cartItem, 1);
    
    setAddToCartMessage("Added to cart successfully!");
    setTimeout(() => setAddToCartMessage(null), 3000);
    setAddingToCart(false);
  };

  // Loading state
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <ErrorDisplay
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Product not found
  if (!product) {
    return (
      <ErrorDisplay
        message="Product not found"
        onRetry={() => router.push("/products")}
      />
    );
  }

  const availability = getAvailabilityInfo(product.availabilityStatus, product.stockQuantity);
  const mainImage = product.images.find(img => img.isMain) || product.images[0];
  const thumbnailImages = product.images.filter(img => img.id !== mainImage?.id);

  // Render star rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} style={{ color: "#D4A017", fontSize: "1rem" }}>★</span>
        ))}
        {hasHalfStar && <span style={{ color: "#D4A017", fontSize: "1rem" }}>½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} style={{ color: "#E0D0C0", fontSize: "1rem" }}>★</span>
        ))}
      </span>
    );
  };

  return (
    <main style={{
      fontFamily: "'Georgia', serif",
      backgroundColor: "#FAF7F4",
      minHeight: "100vh",
      padding: "2rem",
    }}>
      {/* Add to cart notification */}
      {addToCartMessage && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: addToCartMessage.includes("successfully") ? "#4A6741" : "#A0785A",
          color: "#FAF7F4",
          padding: "1rem 1.5rem",
          borderRadius: "8px",
          zIndex: 1000,
          fontFamily: "sans-serif",
          fontSize: "0.9rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
          {addToCartMessage}
        </div>
      )}

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Navigation breadcrumb */}
        <nav style={{ marginBottom: "2rem" }}>
          <Link href="/" style={{ color: "#A0785A", textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
            Home
          </Link>
          <span style={{ color: "#A0785A", margin: "0 0.5rem" }}>/</span>
          <Link href="/products" style={{ color: "#A0785A", textDecoration: "none", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
            Products
          </Link>
          <span style={{ color: "#A0785A", margin: "0 0.5rem" }}>/</span>
          <span style={{ color: "#5C4033", fontFamily: "sans-serif", fontSize: "0.9rem" }}>
            {product.name}
          </span>
        </nav>

        {/* Product detail grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
        }}>
          {/* Left column - Image gallery */}
          <div>
            {/* Main image */}
            <div style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              overflow: "hidden",
              border: "0.5px solid #E0D0C0",
              marginBottom: "1rem",
            }}>
              {mainImage && (
                <img
                  src={mainImage.url}
                  alt={mainImage.alt || product.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              )}
            </div>

            {/* Thumbnail gallery */}
            {thumbnailImages.length > 0 && (
              <div style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}>
                {thumbnailImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index + 1)}
                    style={{
                      width: "80px",
                      height: "80px",
                      border: selectedImageIndex === index + 1
                        ? `2px solid #5C4033`
                        : `1px solid #E0D0C0`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      padding: 0,
                      backgroundColor: "transparent",
                    }}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `${product.name} thumbnail`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right column - Product information */}
          <div>
            {/* Product name */}
            <h1 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "2rem",
              fontWeight: 500,
              color: "#5C4033",
              margin: "0 0 0.5rem 0",
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}>
              {renderStars(product.averageRating)}
              <Link
                href="#reviews"
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "0.85rem",
                  color: "#A0785A",
                  textDecoration: "none",
                }}
              >
                ({product.reviewCount} reviews)
              </Link>
            </div>

            {/* Price */}
            <div style={{
              fontSize: "1.75rem",
              fontWeight: 600,
              color: "#4A6741",
              fontFamily: "sans-serif",
              marginBottom: "1rem",
            }}>
              {formatPrice(product.price, product.currency)}
            </div>

            {/* Availability */}
            <div style={{
              marginBottom: "1.5rem",
              padding: "0.75rem",
              backgroundColor: "#EDE0D4",
              borderRadius: "8px",
            }}>
              <span style={{
                color: availability.color,
                fontWeight: 600,
                fontFamily: "sans-serif",
                fontSize: "0.9rem",
              }}>
                {availability.text}
              </span>
              {availability.subtitle && (
                <span style={{
                  color: "#7A6055",
                  fontFamily: "sans-serif",
                  fontSize: "0.85rem",
                  marginLeft: "0.5rem",
                }}>
                  - {availability.subtitle}
                </span>
              )}
            </div>

            {/* Description */}
            <div style={{
              marginBottom: "1.5rem",
              borderTop: "0.5px solid #E0D0C0",
              borderBottom: "0.5px solid #E0D0C0",
              padding: "1.5rem 0",
            }}>
              <h3 style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "#5C4033",
                margin: "0 0 0.75rem 0",
              }}>
                Description
              </h3>
              <p style={{
                fontFamily: "sans-serif",
                fontSize: "1rem",
                color: "#7A6055",
                lineHeight: 1.7,
                margin: 0,
              }}>
                {product.description}
              </p>
            </div>

            {/* Artisan information */}
            <div style={{
              marginBottom: "1.5rem",
            }}>
              <h3 style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "#5C4033",
                margin: "0 0 0.75rem 0",
              }}>
                About the Artisan
              </h3>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                backgroundColor: "#FAF7F4",
                borderRadius: "12px",
                border: "0.5px solid #E0D0C0",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#5C4033",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FAF7F4",
                  fontFamily: "sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}>
                  {product.artisan.avatarInitials}
                </div>
                <div>
                  <Link
                    href={`/artisan/${product.artisan.id}`}
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "#5C4033",
                      textDecoration: "none",
                    }}
                  >
                    {product.artisan.name}
                  </Link>
                  <p style={{
                    fontFamily: "sans-serif",
                    fontSize: "0.85rem",
                    color: "#A0785A",
                    margin: "0.25rem 0 0 0",
                  }}>
                    {product.artisan.specialty} · {product.artisan.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAddToCart}
              disabled={product.availabilityStatus === "out_of_stock" || addingToCart}
              style={{
                width: "100%",
                backgroundColor: product.availabilityStatus === "out_of_stock" ? "#C4A882" : "#5C4033",
                color: "#FAF7F4",
                padding: "1rem",
                borderRadius: "8px",
                border: "none",
                cursor: product.availabilityStatus === "out_of_stock" ? "not-allowed" : "pointer",
                fontFamily: "sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                transition: "background-color 0.2s",
              }}
            >
              {addingToCart
                ? "Adding..."
                : product.availabilityStatus === "out_of_stock"
                ? "Out of Stock"
                : "Add to Cart"
              }
            </button>
          </div>
        </div>

        {/* Reviews section */}
        <div id="reviews" style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "0.5px solid #E0D0C0",
        }}>
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.5rem",
            fontWeight: 500,
            color: "#5C4033",
            marginBottom: "1.5rem",
          }}>
            Customer Reviews
          </h2>

          {product.reviews.length === 0 ? (
            <p style={{
              fontFamily: "sans-serif",
              color: "#7A6055",
              textAlign: "center",
              padding: "2rem",
            }}>
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}>
              {product.reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    border: "0.5px solid #E0D0C0",
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}>
                    <span style={{
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      color: "#5C4033",
                    }}>
                      {review.author}
                    </span>
                    <span style={{
                      fontFamily: "sans-serif",
                      fontSize: "0.8rem",
                      color: "#A0785A",
                    }}>
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    {renderStars(review.rating)}
                  </div>
                  <p style={{
                    fontFamily: "sans-serif",
                    fontSize: "0.95rem",
                    color: "#7A6055",
                    lineHeight: 1.6,
                    margin: 0,
                  }}>
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Write a review button */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
              style={{
                backgroundColor: "transparent",
                color: "#5C4033",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: `1px solid #5C4033`,
                cursor: "pointer",
                fontFamily: "sans-serif",
                fontSize: "0.9rem",
              }}
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* Add pulse animation keyframes */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </main>
  );
}