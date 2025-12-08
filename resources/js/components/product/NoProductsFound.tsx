import { Package } from 'lucide-react';

export default function NoProductsFound() {
    return (
        <div className="text-center py-16 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500/10 via-cyan-500/10 to-green-500/10 flex items-center justify-center mb-6">
                <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                No Items Exist
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
                We couldn't find any products in this category. Try selecting a different category or check back later!
            </p>
        </div>
    );
}
