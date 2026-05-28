// src/app/product/[productId]/page.tsx
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

// Define the params type for dynamic route
type PageProps = {
  params: Promise<{
    productId: string;
  }>;
};

// This is a Server Component that gets the product ID from the URL
export default async function ProductDetailPage({ params }: PageProps) {
  const { productId } = await params;

  // Validate that productId exists
  if (!productId) {
    notFound();
  }

  // Pass the productId to the Client Component
  return <ProductDetailClient productId={productId} />;
}