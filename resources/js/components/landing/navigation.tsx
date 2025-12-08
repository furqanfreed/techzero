import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Navigation() {
    const { getTotalItems } = useCart();
    const cartCount = getTotalItems();

    return (
        <nav className="bg-white shadow-sm dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center">
                    {/* Logo - Left */}
                    <div className="flex items-center flex-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="/logo-icon.png"
                                alt="TechZero"
                                className="h-8 w-auto"
                            />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                TechZero
                            </span>
                        </Link>
                    </div>

                    {/* Cart & Sign In - Right */}
                    <div className="flex items-center space-x-4 justify-end">
                        <Link
                            href="/cart"
                            className="relative p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 text-xs font-bold text-white shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="http://app.techzero.test/login"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600 transition-colors shadow-md"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
