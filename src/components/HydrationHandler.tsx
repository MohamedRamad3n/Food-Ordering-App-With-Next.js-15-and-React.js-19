"use client";

import { useEffect } from "react";

export default function HydrationHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // This effect runs only on the client side after hydration
    // It will handle any hydration mismatches by forcing a re-render
    const handleHydrationMismatch = () => {
      // Force a re-render to handle any hydration mismatches
      window.dispatchEvent(new Event("resize"));
    };

    // Add a small delay to ensure this runs after hydration
    const timeoutId = setTimeout(handleHydrationMismatch, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <>{children}</>;
} 