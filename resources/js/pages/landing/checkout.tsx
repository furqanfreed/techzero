import LandingLayout from '@/layouts/landing-layout';
import { useCart } from '@/contexts/CartContext';
import { useForm, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ShoppingBag, Package, CreditCard } from 'lucide-react';

interface CheckoutFormData {
    items: Array<{
        id: number;
        name: string;
        price: string;
        quantity: number;
    }>;
}

function CheckoutContent() {
    const { items, getTotalPrice, clearCart } = useCart();
    const { auth } = usePage<SharedData>().props;
    const totalPrice = getTotalPrice();

    const { data, setData, post, processing, errors } = useForm<CheckoutFormData>({
        items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/orders', {
            onSuccess: () => {
                clearCart();
            },
        });
    };

    if (items.length === 0) {
        return (
            <LandingLayout title="Checkout - TechZero">
                <Head title="Checkout" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
                        <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
                        <a
                            href="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600"
                        >
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </LandingLayout>
        );
    }

    return (
        <>
            <Head title="Checkout" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <ShoppingBag className="h-6 w-6" />
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                {items.map((item) => {
                                    const itemPrice = parseFloat(item.price) || 0;
                                    const itemTotal = itemPrice * item.quantity;
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                                        >
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    ${itemPrice.toFixed(2)} × {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">
                                                    ${itemTotal.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>                        
                    </div>

                    {/* Order Total & Submit */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-transparent bg-gradient-to-br from-white to-gray-50 sticky top-4">
                            <h2 className="text-xl font-bold mb-4">Order Total</h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-semibold text-green-600">Free</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full px-6 py-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Place Order
                            </Button>

                            {errors.items && (
                                <p className="mt-2 text-sm text-red-600">{errors.items}</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default function Checkout() {
    return (
        <LandingLayout title="Checkout - TechZero">
            <CheckoutContent />
        </LandingLayout>
    );
}
