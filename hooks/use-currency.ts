import { create } from 'zustand';
import { ICurrency } from '@/types';
import { setCookie, getCookie } from 'cookies-next';

interface CurrencyStore {
  currency: ICurrency;
  currencies: ICurrency[];
  setCurrency: (currency: ICurrency) => void;
  setCurrencies: (currencies: ICurrency[]) => void;
  _hydrated: boolean;
  _setHydrated: () => void;
}

const defaultCurrency: ICurrency = {
  id: 1,
  code: 'EUR',
  name: 'Euro',
  exchangeRate: 1,
};

const defaultCurrencies: ICurrency[] = [
  { id: 1, code: 'EUR', name: 'Euro', exchangeRate: 1 },
  { id: 2, code: 'USD', name: 'United States Dollar', exchangeRate: 0.9 },
  { id: 3, code: 'DKK', name: 'Danish krone', exchangeRate: 0.134 },
];

export const useCurrency = create<CurrencyStore>((set) => ({
  // Initialize with safe defaults for SSR
  currency: defaultCurrency,
  currencies: defaultCurrencies,
  _hydrated: false,
  _setHydrated: () => set({ _hydrated: true }),
  setCurrency: (currency: ICurrency) => {
    set({ currency });
    if (typeof window !== 'undefined') {
      setCookie('currency', JSON.stringify(currency));
    }
  },
  setCurrencies: (currencies: ICurrency[]) => set({ currencies }),
}));

// Hydration function to be called on client side
export const hydrateCurrencyStore = () => {
  if (typeof window === 'undefined') return;

  const currencyCookie = getCookie('currency') as string | null;
  const currency = currencyCookie
    ? JSON.parse(currencyCookie)
    : defaultCurrency;

  useCurrency.setState({
    currency,
    _hydrated: true,
  });
};
