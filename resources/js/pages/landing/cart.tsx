import { Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { useCart } from '@/contexts/CartContext';
import ProductImage from '@/components/product/ProductImage';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

function CartContent() {
    const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
    const totalPrice = getTotalPrice();

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-16">
                    <div className="mx-auto w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-orange-500 via-cyan-500 to-green-500 p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <ShoppingBag className="h-16 w-16 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                        Your cart is empty
                    </h2>
                    <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
                        Start adding some products to your cart and discover amazing deals!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-8 py-4 rounded-lg font-bold text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300"
                    >
                        Continue Shopping 🛍️
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => {
                        const itemPrice = parseFloat(item.price) || 0;
                        const itemTotal = itemPrice * item.quantity;

                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-gradient-to-r hover:border-orange-500/20 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-cyan-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                
                                <div className="flex gap-6 relative z-10">
                                    {/* Product Image */}
                                    <div className="flex-shrink-0">
                                        <div className="w-24 h-24 rounded-xl overflow-hidden ring-2 ring-gray-200 group-hover:ring-2 group-hover:ring-gradient-to-r group-hover:ring-orange-500/30 transition-all duration-300">
                                            <ProductImage
                                                imageUrl={item.image_url}
                                                alt={item.name}
                                                containerClassName="w-full h-full rounded-xl overflow-hidden"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:via-cyan-500 group-hover:to-green-500 transition-all duration-300">
                                            {item.name}
                                        </h3>
                                        <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent mb-4">
                                            ${item.price}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-0 border-2 border-gray-300 rounded-xl overflow-hidden group-hover:border-orange-500/50 transition-colors">
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gradient-to-r hover:from-orange-500 hover:via-cyan-500 hover:to-green-500 hover:text-white transition-all duration-300"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="px-4 py-2 font-bold text-gray-900 min-w-[3rem] text-center bg-gray-50">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gradient-to-r hover:from-orange-500 hover:via-cyan-500 hover:to-green-500 hover:text-white transition-all duration-300"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.id)
                                                }
                                                className="p-2 text-red-600 hover:bg-red-50 hover:scale-110 rounded-lg transition-all duration-300"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="flex-shrink-0 text-right">
                                        <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                            Item Total
                                        </p>
                                        <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                            ${itemTotal.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-transparent bg-gradient-to-br from-white to-gray-50 sticky top-4 overflow-hidden">
                        {/* Decorative gradient border */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 opacity-20 blur-xl -z-10" />
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-orange-50 via-cyan-50 to-green-50">
                                    <span className="text-gray-700 font-medium">Subtotal ({items.length} items)</span>
                                    <span className="font-bold text-gray-900">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-cyan-50">
                                    <span className="text-gray-700 font-medium">Shipping</span>
                                    <span className="font-bold text-green-600">Free</span>
                                </div>
                                <div className="border-t-2 border-gray-200 pt-4 mt-4">
                                    <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-r from-orange-500/10 via-cyan-500/10 to-green-500/10">
                                        <span className="text-lg font-extrabold text-gray-900">
                                            Total
                                        </span>
                                        <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="w-full px-6 py-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 duration-300 mb-4 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Proceed to Checkout                                    
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <Link href="/" className="flex items-center justify-center gap-2 text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-orange-500 hover:via-cyan-500 hover:to-green-500 font-semibold transition-all duration-300">
                                <ArrowLeft className="h-4 w-4" />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Cart() {
    return (
        <LandingLayout title="Shopping Cart - TechZero">
            <CartContent />
        </LandingLayout>
    );
}
