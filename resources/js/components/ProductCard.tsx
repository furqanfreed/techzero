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
            {product.image_url ? (
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                </div>
            ) : (
                <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                    <svg
                        className="w-16 h-16 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            )}

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
