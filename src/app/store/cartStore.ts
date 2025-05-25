import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  subcategory?: string;
  description: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
); 