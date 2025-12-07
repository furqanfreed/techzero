import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { PaginatedData } from '@/types';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: number;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    supplier: {
        id: number;
        name: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    products: PaginatedData<Product>;
    categories: Category[];
}

export default function Home({ products, categories }: Props) {
    return (
        <LandingLayout title="Products - TechZero">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-white">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Discover Our Products
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our wide range of technology products from
                        trusted suppliers
                    </p>
                </div>

                {/* Categories Filter */}
                {categories.length > 0 && (
                    <div className="mb-8 flex flex-wrap gap-2 justify-center">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className="px-4 py-2 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors border border-gray-300"
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {products.data.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
                        >
                            <div className="p-6">
                                <div className="mb-3">
                                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded uppercase tracking-wide">
                                        {product.category.name}
                                    </span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {product.description}
                                </p>
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                    <span className="ml-2 text-sm font-medium text-green-600">
                                        {product.stock > 0
                                            ? `In Stock (${product.stock})`
                                            : 'Out of Stock'}
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mb-4">
                                    {product.supplier.name}
                                </div>
                                <button
                                    disabled={product.stock === 0}
                                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {product.stock > 0
                                        ? 'Add to Cart'
                                        : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {products.links && products.links.length > 3 && (
                    <div className="flex justify-center">
                        <nav className="flex space-x-2">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </LandingLayout>
    );
}
