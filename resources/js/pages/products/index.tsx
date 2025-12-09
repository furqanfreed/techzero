import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Package, Filter, X } from 'lucide-react';
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
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import InputError from '@/components/input-error';
import { type SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: number;
    image_url: string | null;
    status: string;
    category: {
        id: number;
        name: string;
    } | null;
    supplier: {
        id: number;
        name: string;
    } | null;
    created_at: string;
    updated_at: string;
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    products: PaginatedData<Product>;
    categories: Category[];
    filters: {
        search?: string;
        status?: string;
        category_id?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function ProductsIndex({ products, categories, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user.role === 'admin';

    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status && filters.status !== '' ? filters.status : 'all');
    const [categoryId, setCategoryId] = useState(filters.category_id && filters.category_id !== '' ? filters.category_id : 'all');

    const handleFilter = (e: FormEvent) => {
        e.preventDefault();
        router.get(
            '/products',
            {
                search: search || undefined,
                status: status && status !== 'all' ? status : undefined,
                category_id: categoryId && categoryId !== 'all' ? categoryId : undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        setCategoryId('all');
        router.get('/products', {}, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (productId: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${productId}`, {
                preserveScroll: true,
            });
        }
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'active':
                return 'default';
            case 'inactive':
                return 'secondary';
            case 'pending':
                return 'outline';
            case 'draft':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const formatCurrency = (amount: string): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(parseFloat(amount));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Products
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Manage your product catalog
                        </p>
                    </div>
                    <Link href="/products/create">
                        <Button>
                            <Plus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                {/* Filters */}                
                <form onSubmit={handleFilter} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">                                    
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">                                    
                            <Select
                                value={status}
                                onValueChange={setStatus}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">                                    
                            <Select
                                value={categoryId}
                                onValueChange={setCategoryId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id.toString()}
                                        >
                                            {category.name}
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
                    

                {/* Products Table */}
                <Card>                    
                    <CardContent>
                        {products.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Package className="h-12 w-12 text-gray-400 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    No products found
                                </h3>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {search || (status && status !== 'all') || (categoryId && categoryId !== 'all')
                                        ? 'Try adjusting your filters'
                                        : 'Get started by creating a new product'}
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Product
                                            </th>
                                            {isAdmin && (
                                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Supplier
                                                </th>
                                            )}
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Category
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Price
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Stock
                                            </th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Status
                                            </th>
                                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {products.data.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {product.image_url ? (
                                                            <img
                                                                src={product.image_url}
                                                                alt={product.name}
                                                                className="h-10 w-10 rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
                                                                <Package className="h-5 w-5 text-gray-400" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-medium text-gray-900 dark:text-white">
                                                                {product.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                                {product.description.substring(0, 60)}...
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                {isAdmin && (
                                                    <td className="px-4 py-4">
                                                        <span className="text-sm text-gray-900 dark:text-white">
                                                            {product.supplier?.name || 'N/A'}
                                                        </span>
                                                    </td>
                                                )}
                                                <td className="px-4 py-4">
                                                    <span className="text-sm text-gray-900 dark:text-white">
                                                        {product.category?.name || 'Uncategorized'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {formatCurrency(product.price)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`text-sm font-medium ${
                                                            product.stock === 0
                                                                ? 'text-red-600 dark:text-red-400'
                                                                : product.stock < 10
                                                                ? 'text-orange-600 dark:text-orange-400'
                                                                : 'text-gray-900 dark:text-white'
                                                        }`}
                                                    >
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <Badge
                                                        variant={
                                                            getStatusBadgeVariant(
                                                                product.status
                                                            ) as any
                                                        }
                                                    >
                                                        {product.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={`/products/${product.id}/edit`}
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(product.id)
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-600" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {products.links.length > 3 && (
                            <div className="mt-6 flex items-center justify-between">
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                    {products.from && products.to ? (
                                        <>
                                            Showing {products.from} to {products.to} of{' '}
                                            {products.total} results
                                        </>
                                    ) : (
                                        <>Total: {products.total} result{products.total !== 1 ? 's' : ''}</>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {products.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
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
