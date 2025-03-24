import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from "@/components/Loading";

// Import all sections with { ssr: false } to ensure client-side rendering
const HeroSection = dynamic(() => import('@/components/home/HeroSection'), {
  ssr: false,
  loading: () => <Loading />
});

const FeaturesSection = dynamic(() => import('@/components/home/FeaturesSection'), {
  ssr: false,
  loading: () => <Loading />
});

const CategoriesSection = dynamic(() => import('@/components/home/CategoriesSection'), {
  ssr: false,
  loading: () => <Loading />
});

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
  ssr: false,
  loading: () => <Loading />
});

const BrandsSection = dynamic(() => import('@/components/home/BrandsSection'), {
  ssr: false,
  loading: () => <Loading />
});

const CatalogSection = dynamic(() => import('@/components/home/CatalogSection'), {
  ssr: false,
  loading: () => <Loading />
});

const CTASection = dynamic(() => import('@/components/home/CTASection'), {
  ssr: false,
  loading: () => <Loading />
});

export default function Home() {
  return (
    <div className="bg-background">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      {/* <TestimonialsSection /> */}
      {/* <BrandsSection /> */}
      <CatalogSection />
      <CTASection />
    </div>
  );
}