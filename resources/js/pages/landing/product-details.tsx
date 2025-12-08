import { Head, router } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import ProductImage from '@/components/product/ProductImage';
import StarRating from '@/components/product/StarRating';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowLeft, Package, Truck, Shield, RotateCcw, Tag, Scale, Ruler, Star, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Review {
    id: number;
    rating: number;
    comment: string;
    reviewer_name: string;
    reviewer_email: string;
    reviewed_at: string | null;
}

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
    meta?: {
        discountPercentage?: number;
        brand?: string;
        sku?: string;
        weight?: number;
        dimensions?: {
            width: number;
            height: number;
            depth: number;
        };
        warrantyInformation?: string;
        shippingInformation?: string;
        availabilityStatus?: string;
        returnPolicy?: string;
        minimumOrderQuantity?: number;
        tags?: string[];
        images?: string[];
    };
    reviews?: Review[];
}

interface Props {
    product: Product;
}

export default function ProductDetails({ product }: Props) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Get all images (thumbnail + additional images)
    const allImages = product.meta?.images && product.meta.images.length > 0
        ? product.meta.images
        : product.image_url
        ? [product.image_url]
        : [];

    const currentImage = allImages[selectedImageIndex] || product.image_url || '';

    // Calculate discounted price
    const originalPrice = parseFloat(product.price);
    const discountPercentage = product.meta?.discountPercentage || 0;
    const discountedPrice = discountPercentage > 0
        ? originalPrice * (1 - discountPercentage / 100)
        : originalPrice;

    // Color gradients based on category
    const categoryColors: Record<string, string> = {
        'Laptop': 'from-cyan-500 via-blue-500 to-cyan-600',
        'Phone': 'from-yellow-500 via-orange-500 to-yellow-600',
        'Tablet': 'from-orange-500 via-yellow-500 to-orange-600',
        'Accessories': 'from-green-500 via-lime-500 to-green-600',
    };

    const gradientClass = categoryColors[product.category.name] || 'from-orange-500 via-cyan-500 to-green-500';

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No date';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <LandingLayout title={`${product.name} - TechZero`}>
            <ProductDetailsContent 
                product={product} 
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                allImages={allImages}
                currentImage={currentImage}
                discountPercentage={discountPercentage}
                originalPrice={originalPrice}
                discountedPrice={discountedPrice}
                gradientClass={gradientClass}
                formatDate={formatDate}
            />
        </LandingLayout>
    );
}

function ProductDetailsContent({
    product,
    selectedImageIndex,
    setSelectedImageIndex,
    allImages,
    currentImage,
    discountPercentage,
    originalPrice,
    discountedPrice,
    gradientClass,
    formatDate,
}: {
    product: Product;
    selectedImageIndex: number;
    setSelectedImageIndex: (index: number) => void;
    allImages: string[];
    currentImage: string;
    discountPercentage: number;
    originalPrice: number;
    discountedPrice: number;
    gradientClass: string;
    formatDate: (dateString: string | null) => string;
}) {
    const { addToCart } = useCart();

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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 bg-white">
                {/* Back Button */}
                <button
                    onClick={() => router.visit('/')}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Products</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200">
                            <img
                                src={currentImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />                            
                            {discountPercentage > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    Save {discountPercentage.toFixed(0)}%
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {allImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {allImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImageIndex === index
                                                ? 'border-orange-500 ring-2 ring-orange-200'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category & Rating */}
                        <div className="flex items-center justify-between">
                            <span className={`inline-block px-4 py-2 text-sm font-bold text-white rounded-full uppercase tracking-wide bg-gradient-to-r ${gradientClass} shadow-md`}>
                                {product.category.name}
                            </span>
                            {product.rating && (
                                <StarRating rating={product.rating} size="lg" />
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-gray-900">
                            {product.name}
                        </h1>

                        {/* Brand & SKU */}
                        {(product.meta?.brand || product.meta?.sku) && (
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                {product.meta?.brand && (
                                    <span className="font-semibold">Brand: {product.meta.brand}</span>
                                )}
                                {product.meta?.sku && (
                                    <span className="font-mono">SKU: {product.meta.sku}</span>
                                )}
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                ${discountedPrice.toFixed(2)}
                            </span>
                            {discountPercentage > 0 && (
                                <>
                                    <span className="text-2xl text-gray-400 line-through">
                                        ${originalPrice.toFixed(2)}
                                    </span>
                                    <span className="text-lg font-bold text-red-600">
                                        Save {discountPercentage.toFixed(0)}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
                            product.stock > 0
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}>
                            <Package className="h-5 w-5" />
                            <span className="font-semibold">
                                {product.stock > 0
                                    ? `${product.stock} in stock`
                                    : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="prose max-w-none">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Tags */}
                        {product.meta?.tags && product.meta.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {product.meta.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                    >
                                        <Tag className="h-3 w-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className={`w-full px-6 py-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center gap-3 text-lg`}
                        >
                            <ShoppingCart className="h-6 w-6" />
                            <span>
                                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </span>
                        </button>

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            {product.meta?.warrantyInformation && (
                                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-blue-900 uppercase">Warranty</p>
                                        <p className="text-sm text-blue-700">{product.meta.warrantyInformation}</p>
                                    </div>
                                </div>
                            )}

                            {product.meta?.shippingInformation && (
                                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                                    <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-green-900 uppercase">Shipping</p>
                                        <p className="text-sm text-green-700">{product.meta.shippingInformation}</p>
                                    </div>
                                </div>
                            )}

                            {product.meta?.returnPolicy && (
                                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                                    <RotateCcw className="h-5 w-5 text-purple-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-purple-900 uppercase">Returns</p>
                                        <p className="text-sm text-purple-700">{product.meta.returnPolicy}</p>
                                    </div>
                                </div>
                            )}

                            {product.meta?.minimumOrderQuantity && (
                                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                                    <Package className="h-5 w-5 text-orange-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-orange-900 uppercase">Min. Order</p>
                                        <p className="text-sm text-orange-700">{product.meta.minimumOrderQuantity} units</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Specifications */}
                {(product.meta?.weight || product.meta?.dimensions) && (
                    <div className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {product.meta?.weight && (
                                <div className="flex items-center gap-3">
                                    <Scale className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Weight</p>
                                        <p className="text-gray-600">{product.meta.weight} kg</p>
                                    </div>
                                </div>
                            )}

                            {product.meta?.dimensions && (
                                <div className="flex items-center gap-3">
                                    <Ruler className="h-5 w-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Dimensions</p>
                                        <p className="text-gray-600">
                                            {product.meta.dimensions.width} × {product.meta.dimensions.height} × {product.meta.dimensions.depth} cm
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                        <div className="space-y-6">
                            {product.reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="p-6 bg-gray-50 rounded-xl border border-gray-200"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 flex items-center justify-center text-white font-bold">
                                                {review.reviewer_name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{review.reviewer_name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <StarRating rating={review.rating} size="sm" showValue={false} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(review.reviewed_at)}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Supplier Info */}
                <div className="p-6 bg-gradient-to-r from-orange-50 via-cyan-50 to-green-50 rounded-xl border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Supplied by</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                        {product.supplier.name}
                    </p>
                </div>
            </div>
    );
}
