// src/components/CartIcon.tsx
"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

type CartIconProps = {
  className?: string;
  style?: React.CSSProperties;
};

export default function CartIcon({ className = "", style = {} }: CartIconProps) {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <Link
      href="/cart"
      className={className}
      style={{
        position: "relative",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        ...style, // Allow custom styles to override
      }}
    >
      <span style={{ fontSize: "1.25rem" }}>🛒</span>
      {itemCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-8px",
            right: "-12px",
            backgroundColor: "#4A6741",
            color: "#FAF7F4",
            fontSize: "0.7rem",
            fontWeight: "bold",
            borderRadius: "50%",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
      <span style={{ fontFamily: "sans-serif", fontSize: "0.9rem" }}>Cart</span>
    </Link>
  );
}