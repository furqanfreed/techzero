<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create supplier 1
        User::firstOrCreate(
            ['email' => 'supplier1@techzero.store'],
            [
                'name' => 'Supplier One',
                'password' => Hash::make('techzero#'),
                'role' => 'supplier',
                'email_verified_at' => now(),
            ]
        );

        // Create supplier 2
        User::firstOrCreate(
            ['email' => 'supplier2@techzero.store'],
            [
                'name' => 'Supplier Two',
                'password' => Hash::make('techzero#'),
                'role' => 'supplier',
                'email_verified_at' => now(),
            ]
        );
    }
}
