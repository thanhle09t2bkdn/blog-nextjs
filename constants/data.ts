import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/manage/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Products",
    href: "/manage/products",
    icon: "product",
    label: "products",
  },
  {
    title: "Charities",
    href: "/manage/charities",
    icon: "charity",
    label: "charities",
  },
  {
    title: "Customers",
    href: "/manage/customers",
    icon: "user",
    label: "customers",
  },
  {
    title: "Admins",
    href: "/manage/admins",
    icon: "employee",
    label: "admins",
  },
  {
    title: "Currencies",
    href: "/manage/currencies",
    icon: "currency",
    label: "currencies",
  },
  {
    title: "",
    external: true,
  },
  {
    title: "Orders",
    href: "/manage/orders",
    icon: "order",
    label: "orders",
  },
  {
    title: "Payments",
    href: "/manage/payments",
    icon: "billing",
    label: "Payments",
  },
  {
    title: "Charity Payments",
    href: "/manage/charity-payments",
    icon: "charityPayment",
    label: "charity-payments",
  },
  {
    title: "",
    external: true,
  },
  {
    title: "Settings",
    href: "/manage/settings",
    icon: "settings",
    label: "settings",
  },
];

export const currencyCultureCodes = {
  USD: "en-US", // United States Dollar
  EUR: "de-DE", // Euro (using German as a common European locale)
  JPY: "ja-JP", // Japanese Yen
  GBP: "en-GB", // British Pound Sterling
  AUD: "en-AU", // Australian Dollar
  CAD: "en-CA", // Canadian Dollar
  CHF: "de-CH", // Swiss Franc
  CNY: "zh-CN", // Chinese Yuan
  SEK: "sv-SE", // Swedish Krona
  NZD: "en-NZ", // New Zealand Dollar
  MXN: "es-MX", // Mexican Peso
  SGD: "en-SG", // Singapore Dollar
  HKD: "zh-HK", // Hong Kong Dollar
  NOK: "nb-NO", // Norwegian Krone
  KRW: "ko-KR", // South Korean Won
  TRY: "tr-TR", // Turkish Lira
  RUB: "ru-RU", // Russian Ruble
  INR: "hi-IN", // Indian Rupee
  BRL: "pt-BR", // Brazilian Real
  ZAR: "en-ZA", // South African Rand
  VND: "vi-VN", // Vietnamese Dong
  IDR: "id-ID", // Indonesian Rupiah
  THB: "th-TH", // Thai Baht
  MYR: "ms-MY", // Malaysian Ringgit
  PHP: "fil-PH", // Philippine Peso
  DKK: "da-DK", // Danish Krone
};
