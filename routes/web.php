<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Landing page for main domain (techzero.test)
Route::domain('techzero.test')->group(function () {
    Route::get('/', [App\Http\Controllers\LandingController::class, 'index'])->name('landing.home');
    Route::get('/products/{slug}', [App\Http\Controllers\LandingController::class, 'show'])->name('landing.product.show');
    Route::get('/cart', [App\Http\Controllers\LandingController::class, 'cart'])->name('landing.cart');
    Route::get('/about', [App\Http\Controllers\LandingController::class, 'about'])->name('landing.about');
    Route::get('/contact', [App\Http\Controllers\LandingController::class, 'contact'])->name('landing.contact');
    Route::post('/contact', [App\Http\Controllers\LandingController::class, 'storeContact'])->name('landing.contact.store');
});

// Application routes for app subdomain (app.techzero.test)
Route::domain('app.techzero.test')->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    })->name('home');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
    });

    require __DIR__.'/settings.php';
});
