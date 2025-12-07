import { Head, router } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { PaginatedData } from '@/types';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import CategoryFilter from '@/components/CategoryFilter';

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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Discover Our Products
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {products.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <Pagination links={products.links} />
            </div>
        </LandingLayout>
    );
}
