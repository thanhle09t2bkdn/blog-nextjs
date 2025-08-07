import { create } from "zustand";
import { ICurrency } from "@/types";
import { setCookie, getCookie } from "cookies-next";

interface CurrencyStore {
  currency: ICurrency;
  currencies: ICurrency[];
  setCurrency: (currency: ICurrency) => void;
  setCurrencies: (currencies: ICurrency[]) => void;
}

export const useCurrency = create<CurrencyStore>((set) => ({
  currency: getCookie("currency")
    ? JSON.parse(getCookie("currency") as string)
    : {
        id: 1,
        code: "EUR",
        name: "Euro",
        exchangeRate: 1,
      },
  currencies: [
    { id: 1, code: "EUR", name: "Euro", exchangeRate: 1 },
    { id: 2, code: "USD", name: "United States Dollar", exchangeRate: 0.9 },
    { id: 3, code: "DKK", name: "Danish krone", exchangeRate: 0.134 },
  ],
  setCurrency: (currency: ICurrency) => {
    set({ currency });
    setCookie("currency", JSON.stringify(currency));
  },
  setCurrencies: (currencies: ICurrency[]) => set({ currencies }),
}));
