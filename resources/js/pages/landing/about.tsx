import { Head } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';

export default function About() {
    return (
        <LandingLayout title="About Us - TechZero">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            About TechZero
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Your trusted technology marketplace
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                At TechZero, we are dedicated to providing
                                customers with access to the latest and greatest
                                technology products. We connect trusted suppliers
                                with tech enthusiasts, making it easy to find
                                exactly what you need.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                                Our platform ensures quality, reliability, and
                                competitive pricing across all product
                                categories, from accessories and laptops to tablets
                                and smartphones.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                What We Offer
                            </h2>
                            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-blue-600 dark:text-blue-400 mr-2">
                                        ✓
                                    </span>
                                    <span>
                                        Wide selection of technology products
                                        from verified suppliers
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 dark:text-blue-400 mr-2">
                                        ✓
                                    </span>
                                    <span>
                                        Competitive pricing and transparent
                                        product information
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 dark:text-blue-400 mr-2">
                                        ✓
                                    </span>
                                    <span>
                                        Real-time inventory tracking and stock
                                        availability
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-blue-600 dark:text-blue-400 mr-2">
                                        ✓
                                    </span>
                                    <span>
                                        Secure platform with reliable customer
                                        support
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                Our Values
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Quality
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        We only work with trusted suppliers who
                                        meet our quality standards.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Transparency
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Clear pricing, detailed product
                                        information, and honest communication.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Innovation
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Continuously improving our platform to
                                        better serve our customers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
