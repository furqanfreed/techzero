<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all customers
        $customers = User::where('role', 'customer')->get();
        
        if ($customers->isEmpty()) {
            $this->command->warn('No customers found. Please run CustomerSeeder first.');
            return;
        }

        // Get all products
        $products = Product::where('status', 'active')->get();
        
        if ($products->isEmpty()) {
            $this->command->warn('No products found. Please run ProductSeeder first.');
            return;
        }

        $orderStatuses = ['pending', 'processing', 'completed', 'cancelled'];
        $itemStatuses = ['pending', 'processing', 'completed', 'cancelled'];

        // Create 5 orders for each customer
        foreach ($customers as $customer) {
            for ($i = 0; $i < 5; $i++) {
                // Random number of items between 1 and 5
                $numberOfItems = rand(1, 5);
                
                // Randomly select products for this order
                $selectedProducts = $products->random(min($numberOfItems, $products->count()));
                
                // Calculate total amount
                $totalAmount = 0;
                $orderItems = [];
                
                foreach ($selectedProducts as $product) {
                    $quantity = rand(1, 3); // Random quantity between 1 and 3
                    $price = $product->price;
                    $itemTotal = $price * $quantity;
                    $totalAmount += $itemTotal;
                    
                    $orderItems[] = [
                        'product' => $product,
                        'quantity' => $quantity,
                        'price' => $price,
                        'total' => $itemTotal,
                    ];
                }
                
                // Generate unique order number
                $orderNumber = 'ORD-' . strtoupper(Str::random(8)) . '-' . now()->subDays(rand(0, 30))->format('Ymd');
                
                // Create order
                $order = Order::create([
                    'user_id' => $customer->id,
                    'order_number' => $orderNumber,
                    'status' => $orderStatuses[array_rand($orderStatuses)],
                    'total_amount' => $totalAmount,
                    'created_at' => now()->subDays(rand(0, 30)),
                    'updated_at' => now()->subDays(rand(0, 30)),
                ]);
                
                // Create order items
                foreach ($orderItems as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product']->id,
                        'supplier_id' => $item['product']->supplier_id,
                        'user_id' => $customer->id,
                        'quantity' => $item['quantity'],
                        'price' => $item['price'],
                        'total' => $item['total'],
                        'status' => $itemStatuses[array_rand($itemStatuses)],
                        'created_at' => $order->created_at,
                        'updated_at' => $order->updated_at,
                    ]);
                }
            }
        }
        
        $this->command->info('Orders and order items seeded successfully!');
    }
}
