import { Head, usePage } from '@inertiajs/react';
import Navigation from '@/components/landing/navigation';
import { login } from '@/routes';
import { type SharedData } from '@/types';

interface LandingLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function LandingLayout({
    children,
    title = 'TechZero',
}: LandingLayoutProps) {
    const { domains } = usePage<SharedData>().props;
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-white dark:bg-gray-950">
                <Navigation />
                <main>{children}</main>
                <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <img
                                        src="/logo-icon.png"
                                        alt="TechZero"
                                        className="h-6 w-auto"
                                    />
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        TechZero
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Your trusted source for the latest technology
                                    products and innovations.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                                    Quick Links
                                </h3>
                                <ul className="space-y-2">                                    
                                    <li>
                                        <a
                                            href="/about"
                                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                                        >
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/contact"
                                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                                        >
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={login().url}
                                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                                        >
                                            Customer Login
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`//${domains.app}/login`}
                                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                                        >
                                            Supplier Login
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                                    Connect
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                    Email: {domains.email}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    Phone: +1 (555) 123-4567
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                            <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                                © {new Date().getFullYear()} TechZero. All
                                rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
