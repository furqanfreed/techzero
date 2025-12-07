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
        $products = Product::with(['category', 'supplier'])
            ->where('status', 'active')
            ->latest()
            ->paginate(12);

        $categories = Category::all();

        return Inertia::render('landing/home', [
            'products' => $products,
            'categories' => $categories,
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
