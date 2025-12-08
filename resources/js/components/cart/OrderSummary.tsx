import { Link } from '@inertiajs/react';
import { useCart } from '@/contexts/CartContext';

export default function OrderSummary() {
    const { items, getTotalPrice } = useCart();
    const totalPrice = getTotalPrice();

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-transparent bg-gradient-to-br from-white to-gray-50 sticky top-4 overflow-hidden">
                {/* Decorative gradient border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 opacity-20 blur-xl -z-10" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                        Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-orange-50 via-cyan-50 to-green-50">
                            <span className="text-gray-700 font-medium">
                                Subtotal ({items.length} items)
                            </span>
                            <span className="font-bold text-gray-900">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-cyan-50">
                            <span className="text-gray-700 font-medium">Shipping</span>
                            <span className="font-bold text-green-600">Free</span>
                        </div>
                        <div className="border-t-2 border-gray-200 pt-4 mt-4">
                            <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-orange-500/10 via-cyan-500/10 to-green-500/10">
                                <span className="text-lg font-extrabold text-gray-900">
                                    Total
                                </span>
                                <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full px-6 py-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300 mb-4 relative overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Proceed to Checkout
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:via-cyan-500 hover:to-green-500 font-semibold transition-all duration-300"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
