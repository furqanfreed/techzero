<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AdminCustomerService
{
    /**
     * Get paginated customers with their orders for admin.
     *
     * @param array<string, mixed> $filters
     * @return LengthAwarePaginator
     */
    public function getCustomers(array $filters = []): LengthAwarePaginator
    {
        $query = User::where('role', 'customer')
            ->whereHas('orders') // Only customers who have placed orders
            ->with(['orders' => function ($query) {
                $query->select('id', 'user_id', 'order_number', 'status', 'total_amount', 'created_at')
                    ->orderBy('created_at', 'desc');
            }]);

        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Apply order status filter
        if (!empty($filters['order_status'])) {
            $query->whereHas('orders', function ($q) use ($filters) {
                $q->where('status', $filters['order_status']);
            });
        }

        $customers = $query->latest()->paginate(15);

        // Transform the data
        $customers->getCollection()->transform(function ($customer) {
            return [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'orders' => $customer->orders->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'status' => $order->status,
                        'total_amount' => $order->total_amount,
                        'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                    ];
                }),
                'total_orders' => $customer->orders->count(),
                'total_spent' => $customer->orders->sum('total_amount'),
                'created_at' => $customer->created_at->format('Y-m-d H:i:s'),
            ];
        });

        return $customers;
    }

    /**
     * Get all order statuses for filter dropdown.
     *
     * @return array<string>
     */
    public function getOrderStatuses(): array
    {
        return ['pending', 'processing', 'completed', 'cancelled'];
    }
}
