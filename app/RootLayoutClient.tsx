"use client";

import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import PromoBar from "@/components/PromoBar";
import CategoryNav from "@/components/CategoryNav";
import Chatbot from "@/components/Chatbot";
import CookieConsent from "@/components/CookieConsent";
import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleRouteChange = () => {
      setIsLoading(true);
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };

    handleRouteChange();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [pathname, searchParams]);

  return (
    <div className="h-full bg-background antialiased flex flex-col">
      {isLoading && <Loading />}
      <Suspense fallback={<Loading />}>
        <PromoBar />
        <Header />
        <CategoryNav />
      </Suspense>
      <main className="flex-grow relative">
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Chatbot />
      <CookieConsent />
    </div>
  );
}