<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Check if column already exists
        if (!Schema::hasColumn('orders', 'ulid')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->string('ulid')->nullable()->after('id');
            });
        }

        // Generate ULIDs for existing orders that don't have one
        DB::table('orders')->whereNull('ulid')->chunkById(100, function ($orders) {
            foreach ($orders as $order) {
                DB::table('orders')
                    ->where('id', $order->id)
                    ->update(['ulid' => \Illuminate\Support\Str::ulid()]);
            }
        });

        // Add unique index if it doesn't exist
        $indexExists = DB::select("SHOW INDEX FROM orders WHERE Key_name = 'orders_ulid_unique'");
        if (empty($indexExists)) {
            Schema::table('orders', function (Blueprint $table) {
                $table->unique('ulid', 'orders_ulid_unique');
            });
        }

        // Make ulid non-nullable after populating
        if (Schema::hasColumn('orders', 'ulid')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->string('ulid')->nullable(false)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('orders', 'ulid')) {
            Schema::table('orders', function (Blueprint $table) {
                $table->dropUnique('orders_ulid_unique');
                $table->dropColumn('ulid');
            });
        }
    }
};
