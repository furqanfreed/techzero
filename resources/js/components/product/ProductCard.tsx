import ProductImage from './ProductImage';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: number;
    image_url?: string | null;
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

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200 flex flex-col">
            {/* Product Image */}
            <ProductImage imageUrl={product.image_url} alt={product.name} />

            {/* Product Content */}
            <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded uppercase tracking-wide">
                        {product.category.name}
                    </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
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
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-auto"
                >
                    {product.stock > 0
                        ? 'Add to Cart'
                        : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
}
