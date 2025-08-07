import { create } from 'zustand';
import { IProduct, ICartProduct } from '@/types';
import { setCookie, getCookie } from 'cookies-next';

interface CartStore {
  products: ICartProduct[];
  addProductToCart: (product: IProduct, quantity: number) => void;
  removeProductFromCart: (productId: number, quantity: number) => void;
  setProductQuantity: (productId: number, quantity: number) => void;
  refreshCart: (products: ICartProduct[]) => void;
  resetCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  products: getCookie('cart') ? JSON.parse(getCookie('cart') as string) : [],
  addProductToCart: (product: IProduct, quantity: number) => {
    set((state) => {
      const updatedProducts = [...state.products];
      const productIndex = state.products.findIndex((p) => p.id === product.id);
      if (productIndex !== -1) {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          quantity: updatedProducts[productIndex].quantity + quantity,
        };
      } else {
        updatedProducts.push({ ...product, quantity });
      }
      setCookie('cart', JSON.stringify(updatedProducts));
      return {
        products: updatedProducts,
      };
    });
  },
  removeProductFromCart: (productId: number, quantity: number) => {
    set((state) => {
      const productIndex = state.products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[productIndex].quantity -= quantity;
        if (updatedProducts[productIndex].quantity <= 0) {
          updatedProducts.splice(productIndex, 1);
        }
        setCookie('cart', JSON.stringify(updatedProducts));
        return { products: updatedProducts };
      }
      return state;
    });
  },
  setProductQuantity: (productId: number, quantity: number) => {
    set((state) => {
      const productIndex = state.products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[productIndex].quantity = quantity;
        if (quantity <= 0) {
          updatedProducts.splice(productIndex, 1);
        }
        setCookie('cart', JSON.stringify(updatedProducts));
        return { products: updatedProducts };
      }
      return state;
    });
  },
  refreshCart: (products: ICartProduct[]) => {
    set({ products });
    setCookie('cart', JSON.stringify(products));
  },
  resetCart: () => {
    set({ products: [] });
    setCookie('cart', JSON.stringify([]));
  },
}));
