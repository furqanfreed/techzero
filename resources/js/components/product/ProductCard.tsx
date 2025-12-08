import ProductImage from './ProductImage';
import StarRating from './StarRating';

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

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Color gradients based on category for vibrant look
    const categoryColors: Record<string, string> = {
        'Laptop': 'from-blue-500 via-purple-500 to-pink-500',
        'Phone': 'from-cyan-500 via-blue-500 to-indigo-500',
        'Tablet': 'from-orange-500 via-red-500 to-pink-500',
        'Desktop': 'from-green-500 via-teal-500 to-cyan-500',
    };

    const gradientClass = categoryColors[product.category.name] || 'from-blue-500 via-purple-500 to-pink-500';

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-gradient-to-r flex flex-col group">
            {/* Product Image with gradient overlay on hover */}
            <div className="relative overflow-hidden">
                <ProductImage imageUrl={product.image_url} alt={product.name} />
                <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            </div>

            {/* Product Content */}
            <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-white to-gray-50">
                <div className="mb-3 flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full uppercase tracking-wide bg-gradient-to-r ${gradientClass} shadow-md`}>
                        {product.category.name}
                    </span>
                    {product.rating && (
                        <StarRating rating={product.rating} size="sm" />
                    )}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {product.description}
                </p>
                
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${product.price}
                        </span>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        product.stock > 0
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                        {product.stock > 0
                            ? `✓ ${product.stock} in stock`
                            : 'Out of Stock'}
                    </span>
                </div>
                
                <div className="text-xs text-gray-500 mb-4 font-medium">
                    by {product.supplier.name}
                </div>
                
                <button
                    disabled={product.stock === 0}
                    className={`w-full px-4 py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl bg-gradient-to-r ${gradientClass} mt-auto`}
                >
                    {product.stock > 0
                        ? 'Add to Cart 🛒'
                        : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
}
