import { Icons } from '@/components/icons';
import { OrderStatus, PaymentStatus } from '@/constants';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export enum Role {
  Admin = 'Admin',
  Customer = 'Customer',
}

export enum ProductSortType {
  Empty = 'empty',
  PriceAsc = 'price_asc',
  PriceDesc = 'price_desc',
}

export interface IUser {
  id: number;
  name: string;
  companyName: string;
  role: string;
  verified: boolean;
  status: string;
  image: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  contactEmail: string;
  contactPerson: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  barcode: string;
  description: string;
  picture: string;
  stopSale: boolean;
}

export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface IAdmin extends IUser {
  role: Role.Admin;
}

export interface ICustomer extends IUser {
  role: Role.Customer;
}

export interface ICurrency {
  id: number;
  name: string;
  code: string;
  exchangeRate: number;
}

export interface ICharity {
  id: number;
  name: string;
  description: string;
  picture: string;
}

export interface IOrderItem {
  id: number;
  product: IProduct;
  quantity: number;
  price: number;
  orderId: number;
}

export interface IOrder {
  id: number;
  items: IOrderItem[];
  user: ICustomer;
  currency: ICurrency;
  charity: ICharity;
  quantity: number;
  totalAmount: number;
  charityPercent: number;
  status: OrderStatus;
  companyName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  contactEmail: string;
  contactPerson: string;
  createdAt: string;
}

export interface IPayment {
  id: number;
  user: ICustomer;
  order: IOrder;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  dueDate?: string;
  invoiceCode?: string;
}

export interface ICharityPayment {
  id: number;
  date: string;
  charity: ICharity;
  user: ICustomer;
  currency: ICurrency;
  amount: number;
  sendToCharity: string;
  createdAt: string;
}

export interface IStatistics {
  totalProducts: number;
  totalCustomers: number;
  totalOrders: number;
  totalPaidPayments: number;
}
