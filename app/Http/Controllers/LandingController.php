<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    /**
     * Display the home page with products.
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'supplier'])
            ->where('status', 'active');

        // Filter by category if provided
        if ($request->has('category') && $request->category) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        $products = $query->latest()->paginate(12)->withQueryString();

        $categories = Category::all();

        return Inertia::render('landing/home', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $request->category,
        ]);
    }

    /**
     * Display the about page.
     */
    public function about()
    {
        return Inertia::render('landing/about');
    }

    /**
     * Display the contact page.
     */
    public function contact()
    {
        return Inertia::render('landing/contact');
    }

    /**
     * Handle contact form submission.
     */
    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        // TODO: Send email notification or store in database
        // For now, we'll just return success

        return back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }
}
