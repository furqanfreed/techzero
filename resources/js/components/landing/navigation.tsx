import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';

export default function Navigation() {
    const cartCount = 0; // TODO: Get from cart state/context

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
                                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="http://app.techzero.test/login"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 hover:from-blue-700 hover:via-purple-700 hover:to-pink-600 transition-colors shadow-md"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
