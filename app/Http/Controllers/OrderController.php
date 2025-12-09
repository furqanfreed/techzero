<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            // Redirect to login
            return redirect('http://app.techzero.test/login')
                ->with('error', 'Please login to place an order.');
        }

        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|integer|exists:products,id',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            // Calculate total amount
            $totalAmount = 0;
            foreach ($validated['items'] as $item) {
                $totalAmount += (float) $item['price'] * (int) $item['quantity'];
            }

            // Generate unique order number
            $orderNumber = 'ORD-' . strtoupper(Str::random(8)) . '-' . now()->format('Ymd');

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => $orderNumber,
                'status' => 'pending',
                'total_amount' => $totalAmount,
            ]);

            // Create order items
            foreach ($validated['items'] as $item) {
                $itemTotal = (float) $item['price'] * (int) $item['quantity'];
                
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'total' => $itemTotal,
                ]);
            }

            DB::commit();

            return redirect()->route('landing.orders.success', $order->ulid)
                ->with('success', 'Your order has been placed successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()->withErrors([
                'items' => 'Failed to place order. Please try again.',
            ])->withInput();
        }
    }

    /**
     * Display order success page.
     */
    public function success(Request $request, $ulid)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $order = Order::with('orderItems.product')
            ->where('ulid', $ulid)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return Inertia::render('landing/order-success', [
            'order' => $order,
        ]);
    }

    /**
     * Display order history for the authenticated user.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $orders = Order::with('orderItems.product')
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);

        return Inertia::render('landing/order-history', [
            'orders' => $orders,
        ]);
    }

    /**
     * Display a single order details.
     */
    public function show(Request $request, $ulid)
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        $order = Order::with('orderItems.product')
            ->where('ulid', $ulid)
            ->where('user_id', $user->id)
            ->firstOrFail();

        return Inertia::render('landing/order-details', [
            'order' => $order,
        ]);
    }
}
