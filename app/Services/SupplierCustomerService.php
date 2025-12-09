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
     * @param int $supplierId
     * @param array<string, mixed> $filters
     * @return LengthAwarePaginator
     */
    public function getCustomers(int $supplierId, array $filters = []): LengthAwarePaginator
    {
        $query = OrderItem::where('supplier_id', $supplierId)
            ->with([
                'user:id,name,email,created_at',
                'product:id,name,slug,image_url',
                'order:id,order_number,status'
            ]);

        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })->orWhereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // Apply product filter
        if (!empty($filters['product_id'])) {
            $query->where('product_id', $filters['product_id']);
        }

        // Apply order status filter
        if (!empty($filters['order_status'])) {
            $query->whereHas('order', function ($q) use ($filters) {
                $q->where('status', $filters['order_status']);
            });
        }

        $orderItems = $query->latest()->get();

        // Group by customer and collect their products
        $customersData = $orderItems->groupBy('user_id')->map(function ($items, $userId) {
            $firstItem = $items->first();
            $customer = $firstItem->user;
            
            // Skip if customer is null
            if (!$customer) {
                return null;
            }
            
            $products = $items->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'name' => $item->product->name ?? 'Unknown Product',
                    'slug' => $item->product->slug ?? '',
                    'image_url' => $item->product->image_url ?? null,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'total' => $item->total,
                    'order_number' => $item->order->order_number ?? 'N/A',
                    'order_status' => $item->order->status ?? 'pending',
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

        // Manual pagination
        $page = $filters['page'] ?? 1;
        $perPage = 15;
        $offset = ($page - 1) * $perPage;
        $items = $customersData->slice($offset, $perPage)->values();
        $total = $customersData->count();

        // Create paginator instance
        $paginator = new \Illuminate\Pagination\LengthAwarePaginator(
            $items,
            $total,
            $perPage,
            $page,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return $paginator;
    }

    /**
     * Get products for filter dropdown (supplier's products).
     *
     * @param int $supplierId
     * @return Collection
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
