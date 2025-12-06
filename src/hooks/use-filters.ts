"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  return { setFilter, searchParams };
}