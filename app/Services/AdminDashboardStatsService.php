<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class AdminDashboardStatsService
{
    /**
     * Get dashboard statistics for admin.
     *
     * @return array<string, mixed>
     */
    public function getStats(): array
    {
        return [
            'total_products' => $this->getTotalProducts(),
            'total_orders' => $this->getTotalOrders(),
            'total_users' => $this->getTotalUsers(),
            'revenue' => $this->getRevenue(),
        ];
    }

    /**
     * Get total number of products.
     */
    private function getTotalProducts(): int
    {
        return Product::count();
    }

    /**
     * Get total number of orders.
     */
    private function getTotalOrders(): int
    {
        return Order::count();
    }

    /**
     * Get total number of users.
     */
    private function getTotalUsers(): int
    {
        return User::count();
    }

    /**
     * Get total revenue from orders.
     */
    private function getRevenue(): float
    {
        return (float) (Order::sum('total_amount') ?? 0);
    }
}
