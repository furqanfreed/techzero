<?php

namespace App\Services;

use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SupplierCustomerService
{
    /**
     * Get paginated customers with their purchased products for supplier.
     *
     * @param  array<string, mixed>  $filters
     */
    public function getCustomers(int $supplierId, array $filters = []): LengthAwarePaginator
    {
        // First, get unique customer IDs with filters applied, ordered by latest order item
        $customerQuery = OrderItem::where('supplier_id', $supplierId)
            ->select('user_id')
            ->selectRaw('MAX(created_at) as latest_order_item_date')
            ->groupBy('user_id');

        // Apply search filter
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $customerQuery->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->orWhereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // Apply product filter
        if (! empty($filters['product_id'])) {
            $customerQuery->where('product_id', $filters['product_id']);
        }

        // Apply order status filter
        if (! empty($filters['order_status'])) {
            $customerQuery->whereHas('order', function ($q) use ($filters) {
                $q->where('status', $filters['order_status']);
            });
        }

        // Get paginated customer IDs, ordered by latest order item
        $page = $filters['page'] ?? 1;
        $perPage = 15;
        $offset = ($page - 1) * $perPage;

        // Count total unique customers using a subquery
        $countQuery = OrderItem::where('supplier_id', $supplierId)
            ->selectRaw('COUNT(DISTINCT user_id) as total');

        // Apply same filters to count query
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $countQuery->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->orWhereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['product_id'])) {
            $countQuery->where('product_id', $filters['product_id']);
        }

        if (! empty($filters['order_status'])) {
            $countQuery->whereHas('order', function ($q) use ($filters) {
                $q->where('status', $filters['order_status']);
            });
        }

        $totalCustomers = $countQuery->value('total') ?? 0;

        // Get paginated customer IDs
        $customerIds = $customerQuery->orderByDesc('latest_order_item_date')
            ->offset($offset)
            ->limit($perPage)
            ->pluck('user_id');

        // Now load all order items for these customers with proper eager loading
        $orderItemsQuery = OrderItem::where('supplier_id', $supplierId)
            ->whereIn('user_id', $customerIds)
            ->select([
                'id',
                'order_id',
                'product_id',
                'user_id',
                'quantity',
                'price',
                'total',
                'created_at',
            ])
            ->with([
                'user:id,name,email,created_at',
                'product:id,name,slug,image_url',
                'order:id,order_number,status',
            ]);

        // Re-apply filters for the order items query
        if (! empty($filters['search'])) {
            $search = $filters['search'];
            $orderItemsQuery->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->orWhereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['product_id'])) {
            $orderItemsQuery->where('product_id', $filters['product_id']);
        }

        if (! empty($filters['order_status'])) {
            $orderItemsQuery->whereHas('order', function ($q) use ($filters) {
                $q->where('status', $filters['order_status']);
            });
        }

        $orderItems = $orderItemsQuery->latest()->get();

        // Group by customer and collect their products
        $customersData = $orderItems->groupBy('user_id')->map(function ($items, $userId) {
            $firstItem = $items->first();

            // Ensure relationships are loaded
            if (! $firstItem->relationLoaded('user') || ! $firstItem->user) {
                return null;
            }

            $customer = $firstItem->user;

            $products = $items->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'name' => $item->relationLoaded('product') && $item->product ? $item->product->name : 'Unknown Product',
                    'slug' => $item->relationLoaded('product') && $item->product ? $item->product->slug : '',
                    'image_url' => $item->relationLoaded('product') && $item->product ? $item->product->image_url : null,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->total,
                    'order_number' => $item->relationLoaded('order') && $item->order ? $item->order->order_number : 'N/A',
                    'order_status' => $item->relationLoaded('order') && $item->order ? $item->order->status : 'pending',
                    'purchased_at' => $item->created_at ? $item->created_at->format('Y-m-d H:i:s') : now()->format('Y-m-d H:i:s'),
                ];
            })->values();

            return [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'products' => $products,
                'total_orders' => $items->unique('order_id')->count(),
                'total_spent' => $items->sum('total'),
                'created_at' => $customer->created_at ? $customer->created_at->format('Y-m-d H:i:s') : now()->format('Y-m-d H:i:s'),
            ];
        })->filter()->values();

        // Create paginator instance
        $paginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $customersData,
            $totalCustomers,
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginator;
    }

    /**
     * Get products for filter dropdown (supplier's products).
     */
    public function getProducts(int $supplierId): Collection
    {
        return Product::where('supplier_id', $supplierId)
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name']);
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
