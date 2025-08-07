'use client';
import { useEffect, useState } from 'react';
import { hydrateUserStore } from './use-user';
import { hydrateCurrencyStore } from './use-currency';

export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Hydrate all stores
      hydrateUserStore();
      hydrateCurrencyStore();

      // Mark as hydrated
      setIsHydrated(true);
    }
  }, []);

  return isHydrated;
}
