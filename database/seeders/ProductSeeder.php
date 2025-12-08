<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Category mapping from API category names to database category slugs
     */
    private array $categoryMapping = [
        'laptops' => 'laptop',
        'smartphones' => 'phone',
        'tablets' => 'tablet',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create supplier users
        $suppliers = User::where('role', 'supplier')->get();
        
        if ($suppliers->isEmpty()) {
            $suppliers = User::factory()
                ->count(3)
                ->supplier()
                ->create();
        }

        // Seed products from API for each category
        $this->seedProductsFromApi('laptops', 'https://dummyjson.com/products/category/laptops', $suppliers);
        $this->seedProductsFromApi('smartphones', 'https://dummyjson.com/products/category/smartphones', $suppliers);
        $this->seedProductsFromApi('tablets', 'https://dummyjson.com/products/category/tablets', $suppliers);

        $this->command->info('Products seeded successfully from API!');
    }

    /**
     * Seed products from API endpoint
     */
    private function seedProductsFromApi(string $apiCategory, string $url, $suppliers): void
    {
        $this->command->info("Fetching products for {$apiCategory}...");

        try {
            $response = Http::get($url);
            
            if (!$response->successful()) {
                $this->command->error("Failed to fetch products from {$url}");
                return;
            }

            $data = $response->json();
            $products = $data['products'] ?? [];

            if (empty($products)) {
                $this->command->warn("No products found for {$apiCategory}");
                return;
            }

            // Get the category
            $categorySlug = $this->categoryMapping[$apiCategory] ?? Str::slug($apiCategory);
            $category = Category::where('slug', $categorySlug)->first();

            if (!$category) {
                $this->command->warn("Category '{$categorySlug}' not found. Skipping {$apiCategory}.");
                return;
            }

            // Limit to 10 products
            $productsToSeed = array_slice($products, 0, 10);
            $seededCount = 0;

            foreach ($productsToSeed as $productData) {
                try {
                    // Prepare meta data (all fields except the ones we're using directly)
                    $meta = [
                        'id' => $productData['id'] ?? null,
                        'category' => $productData['category'] ?? null,
                        'discountPercentage' => $productData['discountPercentage'] ?? null,
                        'rating' => $productData['rating'] ?? null,
                        'tags' => $productData['tags'] ?? [],
                        'brand' => $productData['brand'] ?? null,
                        'sku' => $productData['sku'] ?? null,
                        'weight' => $productData['weight'] ?? null,
                        'dimensions' => $productData['dimensions'] ?? null,
                        'warrantyInformation' => $productData['warrantyInformation'] ?? null,
                        'shippingInformation' => $productData['shippingInformation'] ?? null,
                        'availabilityStatus' => $productData['availabilityStatus'] ?? null,
                        'returnPolicy' => $productData['returnPolicy'] ?? null,
                        'minimumOrderQuantity' => $productData['minimumOrderQuantity'] ?? null,
                        'meta' => $productData['meta'] ?? null,
                        'images' => $productData['images'] ?? [],
                    ];

                    // Create product
                    $product = Product::create([
                        'supplier_id' => $suppliers->random()->id,
                        'category_id' => $category->id,
                        'name' => $productData['title'] ?? 'Untitled Product',
                        'slug' => Str::slug($productData['title'] ?? 'untitled-product') . '-' . uniqid(),
                        'description' => $productData['description'] ?? '',
                        'price' => $productData['price'] ?? 0,
                        'stock' => $productData['stock'] ?? 0,
                        'image_url' => $productData['thumbnail'] ?? null,
                        'status' => 'active',
                        'meta' => $meta,
                    ]);

                    // Create reviews for this product
                    if (isset($productData['reviews']) && is_array($productData['reviews'])) {
                        foreach ($productData['reviews'] as $reviewData) {
                            Review::create([
                                'product_id' => $product->id,
                                'rating' => $reviewData['rating'] ?? 0,
                                'comment' => $reviewData['comment'] ?? '',
                                'reviewer_name' => $reviewData['reviewerName'] ?? 'Anonymous',
                                'reviewer_email' => $reviewData['reviewerEmail'] ?? 'anonymous@example.com',
                                'status' => 'pending',
                                'reviewed_at' => isset($reviewData['date']) ? $reviewData['date'] : null,
                            ]);
                        }
                    }

                    $seededCount++;
                } catch (\Exception $e) {
                    $this->command->error("Error creating product: " . $e->getMessage());
                    continue;
                }
            }

            $this->command->info("Seeded {$seededCount} products for {$apiCategory}.");
        } catch (\Exception $e) {
            $this->command->error("Error fetching products from {$url}: " . $e->getMessage());
        }
    }
}
