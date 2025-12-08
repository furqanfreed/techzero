import LandingLayout from '@/layouts/landing-layout';
import { useCart } from '@/contexts/CartContext';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItemsList from '@/components/cart/CartItemsList';
import OrderSummary from '@/components/cart/OrderSummary';

function CartContent() {
    const { items } = useCart();

    if (items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <CartItemsList />
                <OrderSummary />
            </div>
        </div>
    );
}

export default function Cart() {
    return (
        <LandingLayout title="Shopping Cart - TechZero">
            <CartContent />
        </LandingLayout>
    );
}
