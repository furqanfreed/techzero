import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Search, Users, Package, ShoppingBag, DollarSign, Calendar } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
} from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

interface Product {
    id: number;
    name: string;
    slug: string;
    image_url: string | null;
    quantity: number;
    price: string;
    total: string;
    order_number: string;
    order_status: string;
    purchased_at: string;
}

interface SupplierCustomer {
    id: number;
    name: string;
    email: string;
    products: Product[];
    total_orders: number;
    total_spent: string;
    created_at: string;
}

interface AdminOrder {
    id: number;
    order_number: string;
    status: string;
    total_amount: string;
    created_at: string;
}

interface AdminCustomer {
    id: number;
    name: string;
    email: string;
    orders: AdminOrder[];
    total_orders: number;
    total_spent: string;
    created_at: string;
}

interface ProductOption {
    id: number;
    name: string;
}

interface Props {
    customers: PaginatedData<SupplierCustomer | AdminCustomer>;
    products?: ProductOption[];
    orderStatuses: string[];
    viewType: 'supplier' | 'admin';
    filters: {
        search?: string;
        product_id?: string;
        order_status?: string;
    };
}

export default function CustomersIndex({ 
    customers, 
    products = [], 
    orderStatuses, 
    viewType,
    filters 
}: Props) {
    const { auth } = usePage<SharedData>().props;
    const isSupplierView = viewType === 'supplier';

    const [search, setSearch] = useState(filters.search || '');
    const [productId, setProductId] = useState(filters.product_id && filters.product_id !== '' ? filters.product_id : 'all');
    const [orderStatus, setOrderStatus] = useState(filters.order_status && filters.order_status !== '' ? filters.order_status : 'all');

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            '/customers',
            {
                search: search || undefined,
                product_id: productId && productId !== 'all' ? productId : undefined,
                order_status: orderStatus && orderStatus !== 'all' ? orderStatus : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setProductId('all');
        setOrderStatus('all');
        router.get('/customers', {}, { preserveState: true, preserveScroll: true });
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'processing':
                return 'secondary';
            case 'pending':
                return 'outline';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const formatCurrency = (amount: string | number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Customers
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {isSupplierView
                                ? 'Manage customers who purchased your products'
                                : 'Manage all customers and their orders'}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search customers..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        {isSupplierView && (
                            <div className="space-y-2">
                                <Select
                                    value={productId}
                                    onValueChange={setProductId}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All products" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All products</SelectItem>
                                        {products.map((product) => (
                                            <SelectItem
                                                key={product.id}
                                                value={product.id.toString()}
                                            >
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Select
                                value={orderStatus}
                                onValueChange={setOrderStatus}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    {orderStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end gap-2 pb-2">
                            <Button type="submit" className="flex-1">
                                Apply Filters
                            </Button>                            
                        </div>
                    </div>
                </form>

                {/* Customers Table */}
                <Card>
                    <CardContent>
                        {customers.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Users className="h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    No customers found
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {search || (productId && productId !== 'all') || (orderStatus && orderStatus !== 'all')
                                        ? 'Try adjusting your filters'
                                        : isSupplierView
                                        ? 'No customers have purchased your products yet'
                                        : 'No customers have placed orders yet'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Customer
                                            </th>
                                            {isSupplierView ? (
                                                <>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Products Purchased
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Total Orders
                                                    </th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Orders
                                                    </th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        Total Orders
                                                    </th>
                                                </>
                                            )}
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Total Spent
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Joined
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {customers.data.map((customer) => (
                                            <tr
                                                key={customer.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            >
                                                <td className="px-4 py-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-white">
                                                            {customer.name}
                                                        </div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {customer.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                {isSupplierView ? (
                                                    <>
                                                        <td className="px-4 py-4">
                                                            <div className="space-y-2">
                                                                {(customer as SupplierCustomer).products.slice(0, 3).map((product, index) => (
                                                                    <div key={`${product.id}-${index}`} className="flex items-center gap-2">
                                                                        {product.image_url ? (
                                                                            <img
                                                                                src={product.image_url}
                                                                                alt={product.name}
                                                                                className="h-8 w-8 rounded object-cover"
                                                                            />
                                                                        ) : (
                                                                            <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
                                                                                <Package className="h-4 w-4 text-gray-400" />
                                                                            </div>
                                                                        )}
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                                                {product.name}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                                Qty: {product.quantity} • {formatCurrency(product.total)}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {(customer as SupplierCustomer).products.length > 3 && (
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                        +{(customer as SupplierCustomer).products.length - 3} more products
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <span className="text-sm text-gray-900 dark:text-white">
                                                                {customer.total_orders}
                                                            </span>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="px-4 py-4">
                                                            <div className="space-y-1">
                                                                {(customer as AdminCustomer).orders.slice(0, 3).map((order) => (
                                                                    <div key={order.id} className="flex items-center gap-2">
                                                                        <ShoppingBag className="h-4 w-4 text-gray-400" />
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                                #{order.order_number}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                                {formatCurrency(order.total_amount)}
                                                                            </div>
                                                                        </div>
                                                                        <Badge
                                                                            variant={getStatusBadgeVariant(order.status) as any}
                                                                            className="text-xs"
                                                                        >
                                                                            {order.status}
                                                                        </Badge>
                                                                    </div>
                                                                ))}
                                                                {(customer as AdminCustomer).orders.length > 3 && (
                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                        +{(customer as AdminCustomer).orders.length - 3} more orders
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <span className="text-sm text-gray-900 dark:text-white">
                                                                {customer.total_orders}
                                                            </span>
                                                        </td>
                                                    </>
                                                )}
                                                <td className="px-4 py-4">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {formatCurrency(customer.total_spent)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(customer.created_at).toLocaleDateString()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {customers.links.length > 3 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    {customers.from && customers.to ? (
                                        <>
                                            Showing {customers.from} to {customers.to} of{' '}
                                            {customers.total} results
                                        </>
                                    ) : (
                                        <>Total: {customers.total} result{customers.total !== 1 ? 's' : ''}</>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {customers.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url || '#'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (link.url) {
                                                    router.get(link.url, {}, { preserveState: true, preserveScroll: true });
                                                }
                                            }}
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
