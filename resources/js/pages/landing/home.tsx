import { Head, router } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { PaginatedData } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import Pagination from '@/components/Pagination';
import CategoryFilter from '@/components/CategoryFilter';
import NoProductsFound from '@/components/product/NoProductsFound';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: number;
    image_url?: string | null;
    rating?: number | null;
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
    selectedCategory?: string;
}

export default function Home({ products, categories, selectedCategory }: Props) {
    const handleCategoryFilter = (categorySlug: string | null) => {
        router.get(
            '/',
            categorySlug ? { category: categorySlug } : {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <LandingLayout title="Products - TechZero">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 bg-white">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                        Discover Our Products
                    </h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Explore our wide range of technology products from
                        trusted suppliers
                    </p>
                </div>

                {/* Categories Filter */}
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategoryFilter}
                />

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                            {products.data.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <Pagination links={products.links} />
                    </>
                ) : (
                    <NoProductsFound />
                )}
            </div>
        </LandingLayout>
    );
}
