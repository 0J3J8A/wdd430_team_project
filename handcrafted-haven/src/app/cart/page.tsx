// src/app/cart/page.tsx
"use client";

import Link from "next/link";
import { useCart, type CartItem } from "@/contexts/CartContext";

// Helper function to format price
const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(price);
};

// Individual cart item row component
function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const itemSubtotal = item.price * item.quantity;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 2fr 1fr 1fr 1fr 50px",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        borderBottom: "0.5px solid #E0D0C0",
      }}
    >
      {/* Product image */}
      <div
        style={{
          width: "80px",
          height: "80px",
          backgroundColor: "#EDE0D4",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Product name and artisan */}
      <div>
        <h3
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#5C4033",
            margin: "0 0 0.25rem 0",
          }}
        >
          {item.name}
        </h3>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.8rem",
            color: "#A0785A",
            margin: 0,
          }}
        >
          by {item.artisanName}
        </p>
      </div>

      {/* Unit price */}
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: "0.9rem",
          color: "#4A6741",
          fontWeight: 500,
        }}
      >
        {formatPrice(item.price, item.currency)}
      </div>

      {/* Quantity controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "4px",
            border: "0.5px solid #E0D0C0",
            backgroundColor: "#FAF7F4",
            cursor: "pointer",
            fontFamily: "sans-serif",
            fontSize: "1rem",
          }}
        >
          -
        </button>
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: "0.9rem",
            minWidth: "30px",
            textAlign: "center",
          }}
        >
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "4px",
            border: "0.5px solid #E0D0C0",
            backgroundColor: "#FAF7F4",
            cursor: "pointer",
            fontFamily: "sans-serif",
            fontSize: "1rem",
          }}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div
        style={{
          fontFamily: "sans-serif",
          fontSize: "0.9rem",
          color: "#5C4033",
          fontWeight: 600,
        }}
      >
        {formatPrice(itemSubtotal, item.currency)}
      </div>

      {/* Remove button */}
      <button
        onClick={handleRemove}
        style={{
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "1.2rem",
          color: "#A0785A",
        }}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
}

// Empty cart message component
function EmptyCart() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
        backgroundColor: "#FAF7F4",
        borderRadius: "12px",
        border: "0.5px solid #E0D0C0",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</div>
      <h2
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "1.5rem",
          fontWeight: 500,
          color: "#5C4033",
          marginBottom: "0.5rem",
        }}
      >
        Your cart is empty
      </h2>
      <p
        style={{
          fontFamily: "sans-serif",
          color: "#7A6055",
          marginBottom: "2rem",
        }}
      >
        Looks like you haven't added any items to your cart yet.
      </p>
      <Link
        href="/"
        style={{
          backgroundColor: "#5C4033",
          color: "#FAF7F4",
          padding: "0.75rem 2rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontFamily: "sans-serif",
          display: "inline-block",
        }}
      >
        Continue Shopping
      </Link>
    </div>
  );
}

// Main Cart Page component
export default function CartPage() {
  const { items, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <main
        style={{
          fontFamily: "'Georgia', serif",
          backgroundColor: "#FAF7F4",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "2rem" }}>
            <Link
              href="/"
              style={{
                color: "#A0785A",
                textDecoration: "none",
                fontFamily: "sans-serif",
                fontSize: "0.9rem",
              }}
            >
              Home
            </Link>
            <span style={{ color: "#A0785A", margin: "0 0.5rem" }}>/</span>
            <span
              style={{
                color: "#5C4033",
                fontFamily: "sans-serif",
                fontSize: "0.9rem",
              }}
            >
              Cart
            </span>
          </nav>

          <EmptyCart />
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        fontFamily: "'Georgia', serif",
        backgroundColor: "#FAF7F4",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{
              color: "#A0785A",
              textDecoration: "none",
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
            }}
          >
            Home
          </Link>
          <span style={{ color: "#A0785A", margin: "0 0.5rem" }}>/</span>
          <span
            style={{
              color: "#5C4033",
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
            }}
          >
            Cart
          </span>
        </nav>

        <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2rem",
            fontWeight: 500,
            color: "#5C4033",
            marginBottom: "2rem",
          }}
        >
          Your Cart
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
          }}
        >
          {/* Cart items list */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "0.5px solid #E0D0C0",
              overflow: "hidden",
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 2fr 1fr 1fr 1fr 50px",
                gap: "1rem",
                padding: "1rem",
                backgroundColor: "#EDE0D4",
                fontFamily: "sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#5C4033",
                borderBottom: "0.5px solid #E0D0C0",
              }}
            >
              <div>Product</div>
              <div>Name</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
              <div></div>
            </div>

            {/* Cart items */}
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Order summary */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "0.5px solid #E0D0C0",
              padding: "1.5rem",
              alignSelf: "start",
              position: "sticky",
              top: "100px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "1.25rem",
                fontWeight: 500,
                color: "#5C4033",
                marginBottom: "1.5rem",
                borderBottom: "0.5px solid #E0D0C0",
                paddingBottom: "0.75rem",
              }}
            >
              Order Summary
            </h2>

            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: "0.9rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ color: "#7A6055" }}>Subtotal</span>
                <span style={{ color: "#5C4033" }}>
                  {formatPrice(subtotal, "USD")}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ color: "#7A6055" }}>Shipping</span>
                <span style={{ color: "#5C4033" }}>
                  {shipping === 0 ? "Free" : formatPrice(shipping, "USD")}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ color: "#7A6055" }}>Tax (8%)</span>
                <span style={{ color: "#5C4033" }}>
                  {formatPrice(tax, "USD")}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "0.5px solid #E0D0C0",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "#4A6741",
                }}
              >
                <span>Total</span>
                <span>{formatPrice(total, "USD")}</span>
              </div>

              <button
                style={{
                  width: "100%",
                  backgroundColor: "#4A6741",
                  color: "#FAF7F4",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: "#A0785A",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "0.5px solid #E0D0C0",
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  fontSize: "0.85rem",
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Continue shopping link */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link
            href="/"
            style={{
              color: "#A0785A",
              textDecoration: "none",
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}