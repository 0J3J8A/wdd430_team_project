// src/app/product/[productId]/page.tsx
// Dynamic route for individual product details

import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

// Disable static prerendering for this route to avoid localStorage/useState errors during build
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

// Define the params type for dynamic route
type PageProps = {
  params: Promise<{
    productId: string;
  }>;
};

// This is a Server Component that gets the product ID from the URL
export default async function ProductDetailPage({ params }: PageProps) {
  const { productId } = await params;

  // Validate that productId exists and is not undefined
  if (!productId || productId === "undefined" || productId === "null") {
    notFound();
  }

  // Validate that productId is a valid ID
  if (!isNaN(Number(productId)) && Number(productId) <= 0) {
    notFound();
  }

  if (isNaN(Number(productId)) && productId.length === 0) {
    notFound();
  }

  // Pass the productId to the Client Component
  return <ProductDetailClient productId={productId} />;
}