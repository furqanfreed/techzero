import LandingLayout from '@/layouts/landing-layout';
import { Link, Head } from '@inertiajs/react';
import { Package, Calendar, DollarSign, Eye } from 'lucide-react';
import { type PaginatedData } from '@/types';

interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: string;
    total: string;
    product: {
        id: number;
        name: string;
        slug: string;
        image_url?: string | null;
    };
}

interface Order {
    id: number;
    ulid: string;
    order_number: string;
    status: string;
    total_amount: string;
    created_at: string;
    orderItems: OrderItem[];
}

interface OrderHistoryProps {
    orders: PaginatedData<Order>;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'processing':
            return 'bg-blue-100 text-blue-800';
        case 'cancelled':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-yellow-100 text-yellow-800';
    }
};

export default function OrderHistory({ orders }: OrderHistoryProps) {
    return (
        <LandingLayout title="Order History - TechZero">
            <Head title="Order History" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                        Order History
                    </h1>
                </div>

                {orders.data.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
                        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 hover:from-orange-600 hover:via-cyan-600 hover:to-green-600"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.data.map((order) => {
                            const items = order.orderItems ?? [];
                            return (
                            <div
                                key={order.id}
                                className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-orange-500/20 transition-all"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {order.order_number}
                                            </h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                                            >
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-4 w-4" />
                                                <span className="font-semibold text-gray-900">
                                                    ${parseFloat(order.total_amount).toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 hidden">
                                                <Package className="h-4 w-4" />
                                                <span>{items.length} item(s)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 hidden">
                                        <Link
                                            href={`/orders/${order.ulid}`}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Details
                                        </Link>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {items.slice(0, 3).map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                {item.product.image_url && (
                                                    <img
                                                        src={item.product.image_url}
                                                        alt={item.product.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                )}
                                                <span className="text-gray-700">
                                                    {item.product.name} × {item.quantity}
                                                </span>
                                            </div>
                                            <span className="font-semibold text-gray-900">
                                                ${parseFloat(item.total).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                    {items.length > 3 && (
                                        <p className="text-sm text-gray-500 pt-2">
                                            +{items.length - 3} more item(s)
                                        </p>
                                    )}
                                </div>
                            </div>
                            );
                        })}

                        {/* Pagination */}
                        {orders.last_page > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                {orders.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-4 py-2 rounded-md ${
                                            link.active
                                                ? 'bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 text-white'
                                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </LandingLayout>
    );
}
