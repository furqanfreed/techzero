<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardStatsResource;
use App\Models\Order;
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
            $stats = [
                'total_products' => Product::count(),
                'total_orders' => Order::count(),
                'total_users' => User::count(),
                'revenue' => Order::sum('total_amount') ?? 0,
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
