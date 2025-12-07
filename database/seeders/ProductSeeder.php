<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all categories
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->warn('No categories found. Please run CategorySeeder first.');
            return;
        }

        // Create a few supplier users
        $suppliers = User::factory()
            ->count(3)
            ->supplier()
            ->create();

        // Create products for each category
        foreach ($categories as $category) {
            // Create 2-4 products per category
            $productCount = rand(2, 4);

            Product::factory()
                ->count($productCount)
                ->create([
                    'category_id' => $category->id,
                    'supplier_id' => $suppliers->random()->id,
                ]);
        }

        $this->command->info('Products seeded successfully!');
    }
}
