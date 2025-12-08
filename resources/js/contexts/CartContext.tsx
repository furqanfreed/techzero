import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
    id: number;
    name: string;
    slug: string;
    price: string;
    image_url?: string | null;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'techzero_cart';

// Load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored) as CartItem[];
        }
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
    }

    return [];
};

// Save cart to localStorage
const saveCartToStorage = (items: CartItem[]): void => {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

export function CartProvider({ children }: { children: ReactNode }) {
    // Initialize state from localStorage
    const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());

    // Save to localStorage whenever items change
    useEffect(() => {
        saveCartToStorage(items);
    }, [items]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            let newItems: CartItem[];
            if (existingItem) {
                // If item already exists, increase quantity
                newItems = prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If item doesn't exist, add it with quantity 1
                newItems = [...prevItems, { ...product, quantity: 1 }];
            }

            return newItems;
        });
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ items, addToCart, getTotalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
