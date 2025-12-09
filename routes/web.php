<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Landing page for main domain
Route::domain(config('domains.main'))->group(function () {
    Route::get('/', [App\Http\Controllers\LandingController::class, 'index'])->name('landing.home');
    Route::get('/products/{slug}', [App\Http\Controllers\LandingController::class, 'show'])->name('landing.product.show');
    Route::get('/cart', [App\Http\Controllers\LandingController::class, 'cart'])->name('landing.cart');
    Route::get('/about', [App\Http\Controllers\LandingController::class, 'about'])->name('landing.about');
    Route::get('/contact', [App\Http\Controllers\LandingController::class, 'contact'])->name('landing.contact');
    Route::post('/contact', [App\Http\Controllers\LandingController::class, 'storeContact'])->name('landing.contact.store');
    
    // Checkout (no auth middleware - we handle auth in controller)
    Route::get('/checkout', [App\Http\Controllers\LandingController::class, 'checkout'])->name('landing.checkout');
    
    // Orders (require auth)
    Route::middleware('auth')->group(function () {
        Route::post('/orders', [App\Http\Controllers\OrderController::class, 'store'])->name('landing.orders.store');
        Route::get('/orders', [App\Http\Controllers\OrderController::class, 'index'])->name('landing.orders.index');
        Route::get('/orders/{ulid}', [App\Http\Controllers\OrderController::class, 'show'])->name('landing.orders.show');
        Route::get('/orders/{ulid}/success', [App\Http\Controllers\OrderController::class, 'success'])->name('landing.orders.success');
    });
    
    // Logout
    Route::post('/logout', [App\Http\Controllers\LogoutController::class, '__invoke'])->name('landing.logout');
});

// Application routes for app subdomain
Route::domain(config('domains.app'))->group(function () {
    // Redirect root to dashboard if authenticated, otherwise to login
    Route::get('/', function () {
        if (\Illuminate\Support\Facades\Auth::check()) {            
            return redirect()->route('dashboard');
        }
        return redirect()->route('login');
    })->name('home');

    // Dashboard routes - requires auth and role check
    Route::middleware(['auth', 'verified', 'check.user.role'])->group(function () {
        Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
        
        // Product routes - CRUD operations
        Route::resource('products', App\Http\Controllers\ProductController::class);
    });

    // API routes for dashboard - requires auth
    Route::middleware('auth')->prefix('api')->group(function () {
        Route::get('dashboard/stats', [App\Http\Controllers\Api\DashboardController::class, 'stats'])->name('api.dashboard.stats');
    });

    require __DIR__.'/settings.php';
});
