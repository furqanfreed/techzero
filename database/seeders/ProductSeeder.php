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
        'mobile-accessories' => 'accessories',
    ];

    /**
     * Reverse mapping from database slugs to API category names
     */
    private array $reverseCategoryMapping = [
        'laptop' => 'laptops',
        'phone' => 'smartphones',
        'tablet' => 'tablets',
        'accessories' => 'mobile-accessories',
    ];

    /**
     * API endpoints for each category
     */
    private array $apiEndpoints = [
        'laptops' => 'https://dummyjson.com/products/category/laptops',
        'smartphones' => 'https://dummyjson.com/products/category/smartphones',
        'tablets' => 'https://dummyjson.com/products/category/tablets',
        'mobile-accessories' => 'https://dummyjson.com/products/category/mobile-accessories',
    ];

    /**
     * Run the database seeds.
     * 
     * @param string|null $categorySlug Optional category slug (e.g., 'laptop', 'phone', 'tablet', 'accessories')
     */
    public function run(?string $categorySlug = null): void
    {
        // Check if category was passed as command argument
        if ($categorySlug === null && $this->command && method_exists($this->command, 'hasArgument') && $this->command->hasArgument('category')) {
            $categorySlug = $this->command->argument('category');
        }

        // Get or create supplier users
        $suppliers = User::where('role', 'supplier')->get();
        
        if ($suppliers->isEmpty()) {
            $suppliers = User::factory()
                ->count(3)
                ->supplier()
                ->create();
        }

        // If a specific category is provided, seed only that category
        if ($categorySlug !== null) {
            $apiCategory = $this->reverseCategoryMapping[$categorySlug] ?? null;
            
            if (!$apiCategory) {
                $this->command->error("Invalid category slug: {$categorySlug}. Valid options: laptop, phone, tablet, accessories");
                return;
            }

            $url = $this->apiEndpoints[$apiCategory];
            $this->seedProductsFromApi($apiCategory, $url, $suppliers);
            $this->command->info('Products seeded successfully from API!');
            return;
        }

        // If no category specified, seed all categories and mix them
        $this->seedAllCategoriesMixed($suppliers);
    }

    /**
     * Seed all categories and mix products so they appear interleaved when sorted by latest
     */
    private function seedAllCategoriesMixed($suppliers): void
    {
        $allProducts = [];

        // Collect products from all categories
        foreach ($this->apiEndpoints as $apiCategory => $url) {
            $this->command->info("Fetching products for {$apiCategory}...");
            
            try {
                $response = Http::get($url);
                
                if (!$response->successful()) {
                    $this->command->error("Failed to fetch products from {$url}");
                    continue;
                }

                $data = $response->json();
                $products = $data['products'] ?? [];

                if (empty($products)) {
                    $this->command->warn("No products found for {$apiCategory}");
                    continue;
                }

                // Get the category
                $categorySlug = $this->categoryMapping[$apiCategory] ?? Str::slug($apiCategory);
                $category = Category::where('slug', $categorySlug)->first();

                if (!$category) {
                    $this->command->warn("Category '{$categorySlug}' not found. Skipping {$apiCategory}.");
                    continue;
                }

                // Limit to 10 products per category and add category info
                $productsToSeed = array_slice($products, 0, 10);
                
                foreach ($productsToSeed as $productData) {
                    $allProducts[] = [
                        'apiCategory' => $apiCategory,
                        'category' => $category,
                        'productData' => $productData,
                    ];
                }
            } catch (\Exception $e) {
                $this->command->error("Error fetching products from {$url}: " . $e->getMessage());
            }
        }

        // Shuffle all products to mix categories
        shuffle($allProducts);

        // Now save all products in the shuffled order with small delays to ensure different timestamps
        $seededCount = 0;
        foreach ($allProducts as $index => $item) {
            try {
                // Add a small delay (1 millisecond) between saves to ensure different timestamps
                // This ensures products appear mixed when sorted by latest
                if ($index > 0) {
                    usleep(1000); // 1 millisecond delay
                }
                
                $product = $this->createProduct($item['productData'], $item['category'], $suppliers);
                $seededCount++;
            } catch (\Exception $e) {
                $this->command->error("Error creating product: " . $e->getMessage());
                continue;
            }
        }

        $this->command->info("Seeded {$seededCount} products from all categories (mixed order)!");
    }

    /**
     * Seed products from API endpoint for a specific category
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
                    $this->createProduct($productData, $category, $suppliers);
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

    /**
     * Create a product from API data
     */
    private function createProduct(array $productData, Category $category, $suppliers): Product
    {
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

        return $product;
    }
}
