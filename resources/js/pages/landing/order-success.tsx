import LandingLayout from '@/layouts/landing-layout';
import { Link, Head } from '@inertiajs/react';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { useEffect } from 'react';
import { useCartStore } from '@/stores/cart-store';

interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: string;
    total: string;
    product: {
        id: number;
        name: string;
        slug: string;
        image_url?: string | null;
    };
}

interface Order {
    id: number;
    ulid: string;
    order_number: string;
    status: string;
    total_amount: string;
    created_at: string;
    orderItems: OrderItem[];
}

interface OrderSuccessProps {
    order: Order;
}

// Inner component that has access to cart store
function OrderSuccessContent({ order }: OrderSuccessProps) {
    const clearCart = useCartStore((state) => state.clearCart);
    
    // Clear cart from localStorage and update store when order success page loads
    useEffect(() => {
        try {
            // Clear cart from localStorage
            localStorage.removeItem('techzero_cart');
            
            // Update store to clear cart state
            clearCart();
        } catch (error) {
            console.error('Error clearing cart from localStorage:', error);
        }
    }, [clearCart]);

    // Safety guard in case orderItems isn't hydrated
    const items = order?.orderItems ?? [];

    return (
        <>
            <Head title="Order Placed Successfully" />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-green-100 p-4">
                            <CheckCircle className="h-16 w-16 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Thank you for your order. We've received your order and will begin processing it right away.
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                        Order Number: <span className="text-orange-600">{order.order_number}</span>
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Package className="h-5 w-5 text-gray-600" />
                        <h2 className="text-2xl font-bold">Order Details</h2>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {item.product.image_url && (
                                        <img
                                            src={item.product.image_url}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            Quantity: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">
                                        ${parseFloat(item.total).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total Amount</span>
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                ${parseFloat(order.total_amount ?? '0').toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/orders"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600 transition-all shadow-md hover:shadow-lg"
                    >
                        View Order History
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </>
    );
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
    return (
        <LandingLayout title="Order Placed - TechZero">
            <OrderSuccessContent order={order} />
        </LandingLayout>
    );
}
