<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            SupplierSeeder::class,
            CategorySeeder::class,
        ]);

        // Call ProductSeeder 3 times to seed products
        for ($i = 0; $i < 3; $i++) {
            $this->call(ProductSeeder::class);
        }

        // Seed customers and orders
        $this->call([
            CustomerSeeder::class,
            OrderSeeder::class,
        ]);
    }
}
