import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    slug: string;
    price: string;
    image_url?: string | null;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product) => {
                set((state) => {
                    const existingItem = state.items.find((item) => item.id === product.id);

                    if (existingItem) {
                        // If item already exists, increase quantity
                        return {
                            items: state.items.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    } else {
                        // If item doesn't exist, add it with quantity 1
                        return {
                            items: [...state.items, { ...product, quantity: 1 }],
                        };
                    }
                });
            },
            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    set((state) => ({
                        items: state.items.filter((item) => item.id !== productId),
                    }));
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                }));
            },
            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                return get().items.reduce((total, item) => {
                    const price = parseFloat(item.price) || 0;
                    return total + price * item.quantity;
                }, 0);
            },
            clearCart: () => {
                set({ items: [] });
            },
        }),
        {
            name: 'techzero_cart',
        }
    )
);
