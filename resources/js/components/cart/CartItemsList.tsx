import { useCart } from '@/contexts/CartContext';
import ProductImage from '@/components/product/ProductImage';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartItemsList() {
    const { items, removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    return (
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
                                        onClick={() => removeFromCart(item.id)}
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
    );
}
