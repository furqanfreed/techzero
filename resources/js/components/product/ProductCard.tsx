import ProductImage from './ProductImage';
import StarRating from './StarRating';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

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
    const { addToCart } = useCart();

    // Color gradients based on category using logo colors (Orange, Cyan, Green, Yellow)
    const categoryColors: Record<string, string> = {
        'Laptop': 'from-cyan-500 via-blue-500 to-cyan-600',
        'Phone': 'from-yellow-500 via-orange-500 to-yellow-600',
        'Tablet': 'from-orange-500 via-yellow-500 to-orange-600',
        'Desktop': 'from-green-500 via-lime-500 to-green-600',
    };

    const gradientClass = categoryColors[product.category.name] || 'from-orange-500 via-cyan-500 to-green-500';

    const handleAddToCart = () => {
        if (product.stock > 0) {
            addToCart({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image_url: product.image_url,
            });
        }
    };

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
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-cyan-500 group-hover:to-green-500 transition-all duration-300">
                    {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {product.description}
                </p>
                
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
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
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className={`w-full px-4 py-3 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl bg-gradient-to-r ${gradientClass} mt-auto flex items-center justify-center gap-2`}
                >
                    {product.stock > 0
                        ? (
                            <>
                                <ShoppingCart className="h-5 w-5" />
                                <span>Add to Cart</span>
                            </>
                        )
                        : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
}
