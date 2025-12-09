<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            ['name' => 'John Smith', 'email' => 'john.smith@example.com'],
            ['name' => 'Emily Johnson', 'email' => 'emily.johnson@example.com'],
            ['name' => 'Michael Williams', 'email' => 'michael.williams@example.com'],
            ['name' => 'Sarah Brown', 'email' => 'sarah.brown@example.com'],
            ['name' => 'David Jones', 'email' => 'david.jones@example.com'],
            ['name' => 'Jessica Garcia', 'email' => 'jessica.garcia@example.com'],
            ['name' => 'Christopher Miller', 'email' => 'christopher.miller@example.com'],
            ['name' => 'Amanda Davis', 'email' => 'amanda.davis@example.com'],
            ['name' => 'Matthew Rodriguez', 'email' => 'matthew.rodriguez@example.com'],
            ['name' => 'Ashley Martinez', 'email' => 'ashley.martinez@example.com'],
            ['name' => 'James Wilson', 'email' => 'james.wilson@example.com'],
            ['name' => 'Stephanie Anderson', 'email' => 'stephanie.anderson@example.com'],
            ['name' => 'Daniel Taylor', 'email' => 'daniel.taylor@example.com'],
            ['name' => 'Nicole Thomas', 'email' => 'nicole.thomas@example.com'],
            ['name' => 'Robert Hernandez', 'email' => 'robert.hernandez@example.com'],
            ['name' => 'Lauren Moore', 'email' => 'lauren.moore@example.com'],
            ['name' => 'William Jackson', 'email' => 'william.jackson@example.com'],
            ['name' => 'Megan White', 'email' => 'megan.white@example.com'],
            ['name' => 'Joseph Harris', 'email' => 'joseph.harris@example.com'],
            ['name' => 'Rachel Martin', 'email' => 'rachel.martin@example.com'],
        ];

        foreach ($customers as $customer) {
            User::firstOrCreate(
                ['email' => $customer['email']],
                [
                    'name' => $customer['name'],
                    'password' => Hash::make('techzero#'),
                    'role' => 'customer',
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
