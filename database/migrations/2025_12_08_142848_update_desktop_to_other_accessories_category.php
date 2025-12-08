<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update existing Desktop category to Accessories
        DB::table('categories')
            ->where('name', 'Desktop')
            ->orWhere('slug', 'desktop')
            ->update([
                'name' => 'Accessories',
                'slug' => 'accessories',
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert Accessories back to Desktop
        DB::table('categories')
            ->where('name', 'Accessories')
            ->orWhere('slug', 'accessories')
            ->update([
                'name' => 'Desktop',
                'slug' => 'desktop',
            ]);
    }
};
