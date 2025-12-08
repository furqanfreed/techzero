<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check if the role column already exists
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('role', ['admin', 'supplier', 'customer'])->default('customer')->after('password');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Only drop if the column exists
        if (Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('role');
            });
        }
    }
};
