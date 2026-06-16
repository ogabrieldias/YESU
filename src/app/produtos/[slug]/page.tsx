import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProductBySlug, formatPrice } from "@/lib/data/products";
import { ProductPageClient } from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} | YESU Brasil`,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${product.tagline}`,
      description: product.description,
      images: [product.coverImage],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductPageClient product={product} />;
}
