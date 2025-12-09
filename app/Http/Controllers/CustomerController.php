<?php

namespace App\Http\Controllers;

use App\Services\AdminCustomerService;
use App\Services\SupplierCustomerService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    /**
     * Display a listing of customers.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->isSupplier()) {
            $service = new SupplierCustomerService();
            
            $filters = [
                'search' => $request->search,
                'product_id' => $request->product_id,
                'order_status' => $request->order_status,
                'page' => $request->page,
            ];

            $customers = $service->getCustomers($user->id, $filters);
            $products = $service->getProducts($user->id);
            $orderStatuses = $service->getOrderStatuses();

            return Inertia::render('customers/index', [
                'customers' => $customers,
                'products' => $products,
                'orderStatuses' => $orderStatuses,
                'viewType' => 'supplier',
                'filters' => [
                    'search' => $request->search,
                    'product_id' => $request->product_id,
                    'order_status' => $request->order_status,
                ],
            ]);
        }

        if ($user->isAdmin()) {
            $service = new AdminCustomerService();
            
            $filters = [
                'search' => $request->search,
                'order_status' => $request->order_status,
            ];

            $customers = $service->getCustomers($filters);
            $orderStatuses = $service->getOrderStatuses();

            return Inertia::render('customers/index', [
                'customers' => $customers,
                'orderStatuses' => $orderStatuses,
                'viewType' => 'admin',
                'filters' => [
                    'search' => $request->search,
                    'order_status' => $request->order_status,
                ],
            ]);
        }

        // Fallback - should not reach here due to middleware
        abort(403, 'Unauthorized action.');
    }
}
