// app/api/artisans/[slug]/route.ts
//
// REST API route: GET /api/artisans/:slug
//
// Returns the artisan's profile and their products as JSON.
// Useful for client-side components and future mobile clients.
//
// Next.js 16: params is a Promise — must be awaited before use.

import { NextRequest, NextResponse } from "next/server";
import { getArtisanBySlug, getProductsByArtisanId } from "@/lib/artisans";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { slug } = await params;

  const artisan = await getArtisanBySlug(slug);

  if (!artisan) {
    return NextResponse.json(
      { error: "Artisan not found", slug },
      { status: 404 }
    );
  }

  const products = await getProductsByArtisanId(artisan.id);

  return NextResponse.json(
    { artisan, products },
    {
      status: 200,
      headers: {
        // Cache for 60s on CDN edge, allow stale while revalidating
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}