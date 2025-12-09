import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Welcome to your TechZero dashboard
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Products
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    --
                                </p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Orders
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    --
                                </p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Users
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    --
                                </p>
                            </div>
                            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
                                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Revenue
                                </p>
                                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                                    --
                                </p>
                            </div>
                            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
                                <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-900">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Recent Activity
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            No recent activity to display.
                        </p>
                    </div>

                    <div className="rounded-lg border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-gray-900">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Quick Actions
                        </h2>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Quick actions will appear here.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
