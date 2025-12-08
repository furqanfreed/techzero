import { Link } from '@inertiajs/react';

export default function EmptyCart() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-16 flex flex-col items-center justify-center">
                <img
                    src="/logo-icon.png"
                    alt="TechZero Logo"
                    className="h-16 w-16 object-contain mb-4"
                />
                <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent mt-6">
                    Your cart is empty
                </h2>
                <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
                    Start adding some products to your cart and discover amazing deals!
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center px-8 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
