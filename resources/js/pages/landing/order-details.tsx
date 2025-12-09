import LandingLayout from '@/layouts/landing-layout';
import { Link, Head } from '@inertiajs/react';
import { ArrowLeft, Package, Calendar, DollarSign, CheckCircle } from 'lucide-react';

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

interface OrderDetailsProps {
    order: Order;
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

export default function OrderDetails({ order }: OrderDetailsProps) {
    return (
        <LandingLayout title={`Order ${order.order_number} - TechZero`}>
            <Head title={`Order ${order.order_number}`} />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
                <Link
                    href="/orders"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Order History
                </Link>

                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b">
                        <div>
                            <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                {order.order_number}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
                            >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <Package className="h-5 w-5 text-gray-600" />
                        <h2 className="text-2xl font-bold">Order Items</h2>
                    </div>

                    <div className="space-y-4 mb-6">
                        {order.orderItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-500/20 transition-all"
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {item.product.image_url && (
                                        <img
                                            src={item.product.image_url}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                    )}
                                    <div>
                                        <Link
                                            href={`/products/${item.product.slug}`}
                                            className="font-semibold text-gray-900 hover:text-orange-600 transition-colors"
                                        >
                                            {item.product.name}
                                        </Link>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Quantity: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">
                                        ${parseFloat(item.total).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-gray-600" />
                                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                            </div>
                            <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                                ${parseFloat(order.total_amount).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/orders"
                        className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back to Order History
                    </Link>
                </div>
            </div>
        </LandingLayout>
    );
}
