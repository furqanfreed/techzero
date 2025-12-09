<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardStatsResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function stats(Request $request): JsonResponse
    {
        try {
            $userRole = globalUserRole();
            $user = $request->user();

            // Initialize base queries
            $ordersQuery = Order::query();
            $productsQuery = Product::query();
            $usersQuery = User::query();

            // Filter data based on user role
            if ($userRole === 'customer' && $user) {
                // For customers: only show their own data
                $ordersQuery->where('user_id', $user->id);
                // Products remain visible to all (customers can browse)
                // Users count not relevant for customers
                $usersQuery->whereRaw('1 = 0'); // Return 0 for users
            } elseif ($userRole === 'supplier' && $user) {
                // For suppliers: only show their own products and related orders
                $productsQuery->where('supplier_id', $user->id);
                
                // Get order IDs that contain products from this supplier
                $supplierOrderIds = OrderItem::whereHas('product', function ($query) use ($user) {
                    $query->where('supplier_id', $user->id);
                })->pluck('order_id')->unique();
                
                $ordersQuery->whereIn('id', $supplierOrderIds);
                
                // Count unique customers who ordered their products
                $usersQuery->whereIn('id', function ($query) use ($supplierOrderIds) {
                    $query->select('user_id')
                        ->from('orders')
                        ->whereIn('id', $supplierOrderIds);
                });
            }
            // For admin: show all data (no filtering needed)

            // Calculate revenue based on role
            $revenue = 0;
            if ($userRole === 'supplier' && $user) {
                // For suppliers: calculate revenue from order items of their products
                $revenue = OrderItem::whereHas('product', function ($query) use ($user) {
                    $query->where('supplier_id', $user->id);
                })->sum('total') ?? 0;
            } else {
                // For customers and admins: use order total
                $revenue = $ordersQuery->sum('total_amount') ?? 0;
            }

            $stats = [
                'total_products' => $productsQuery->count(),
                'total_orders' => $ordersQuery->count(),
                'total_users' => $userRole === 'customer' ? 0 : $usersQuery->count(),
                'revenue' => $revenue,
            ];

            return response()->json([
                'success' => true,
                'data' => new DashboardStatsResource($stats),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch dashboard statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
