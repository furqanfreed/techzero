<?php

namespace App\Services;

use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class SupplierDashboardStatsService
{
    /**
     * Get dashboard statistics for supplier.
     *
     * @param int $supplierId
     * @return array<string, mixed>
     */
    public function getStats(int $supplierId): array
    {
        return [
            'total_products' => $this->getTotalProducts($supplierId),
            'total_orders' => $this->getTotalOrders($supplierId),
            'total_users' => $this->getTotalUsers($supplierId),
            'revenue' => $this->getRevenue($supplierId),
        ];
    }

    /**
     * Get total number of products for the supplier.
     */
    private function getTotalProducts(int $supplierId): int
    {
        return Product::where('supplier_id', $supplierId)->count();
    }

    /**
     * Get total number of distinct orders from order_items.
     */
    private function getTotalOrders(int $supplierId): int
    {
        return (int) (DB::table('order_items')
            ->where('supplier_id', $supplierId)
            ->selectRaw('COUNT(DISTINCT order_id) as count')
            ->value('count') ?? 0);
    }

    /**
     * Get total number of distinct users who bought items from this supplier.
     */
    private function getTotalUsers(int $supplierId): int
    {
        return (int) (DB::table('order_items')
            ->where('supplier_id', $supplierId)
            ->selectRaw('COUNT(DISTINCT user_id) as count')
            ->value('count') ?? 0);
    }

    /**
     * Get revenue from completed order items.
     */
    private function getRevenue(int $supplierId): float
    {
        return (float) (OrderItem::where('supplier_id', $supplierId)
            ->where('status', 'completed')
            ->sum('total') ?? 0);
    }
}
