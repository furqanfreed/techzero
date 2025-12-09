<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        // Build query based on user role
        $query = Product::with(['category', 'supplier:id,name']);

        if ($user->isSupplier()) {
            // Suppliers only see their own products
            $query->where('supplier_id', $user->id);
        }
        // Admins see all products (no additional filter needed)

        // Apply search filter if provided
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Apply status filter if provided
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Apply category filter if provided
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        $products = $query->latest()->paginate(15);

        // Get categories for filter dropdown
        $categories = Category::where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'category_id' => $request->category_id,
            ],
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create(): Response
    {
        $categories = Category::where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('products/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(StoreProductRequest $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validated();

        // Generate slug from name
        $slug = Str::slug($validated['name']);
        
        // Ensure slug is unique
        $originalSlug = $slug;
        $counter = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }

        $product = Product::create([
            'supplier_id' => $user->id,
            'category_id' => $validated['category_id'],
            'name' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'],
            'price' => $validated['price'],
            'stock' => $validated['stock'],
            'image_url' => $validated['image_url'] ?? null,
            'status' => $validated['status'] ?? 'active',
        ]);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Request $request, Product $product): Response
    {
        $user = $request->user();

        // Check authorization: suppliers can only edit their own products
        if ($user->isSupplier() && $product->supplier_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $product->load(['category', 'supplier:id,name']);

        $categories = Category::where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('products/edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(UpdateProductRequest $request, Product $product): RedirectResponse
    {
        $user = $request->user();

        // Check authorization: suppliers can only update their own products
        if ($user->isSupplier() && $product->supplier_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validated();

        // Generate slug from name if name changed
        if ($validated['name'] !== $product->name) {
            $slug = Str::slug($validated['name']);
            
            // Ensure slug is unique (excluding current product)
            $originalSlug = $slug;
            $counter = 1;
            while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
            
            $validated['slug'] = $slug;
        }

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Request $request, Product $product): RedirectResponse
    {
        $user = $request->user();

        // Check authorization: suppliers can only delete their own products
        if ($user->isSupplier() && $product->supplier_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
