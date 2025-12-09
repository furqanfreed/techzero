<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Services\AdminDashboardStatsService;
use App\Http\Resources\DashboardStatsResource;
use App\Services\SupplierDashboardStatsService;

class DashboardController extends Controller
{
    public function __construct(
        private readonly AdminDashboardStatsService $adminDashboardStatsService,
        private readonly SupplierDashboardStatsService $supplierDashboardStatsService
    ) {
    }

    /**
     * Get dashboard statistics.
     */
    public function stats(Request $request): JsonResponse
    {
        try {
            $userRole = globalUserRole();
            $user = $request->user();

            $stats = match ($userRole) {
                'supplier' => $this->supplierDashboardStatsService->getStats($user->id),
                'admin' => $this->adminDashboardStatsService->getStats(),
            };

            return response()->json([
                'success' => true,
                'data' => new DashboardStatsResource($stats),
            ]);

        } catch (Exception $e) {
            Log::error('Failed to fetch dashboard statistics: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch dashboard statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
