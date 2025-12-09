<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('login');
        }

        // If user is a customer, redirect to cart page on main domain
        if ($user->isCustomer()) {
            $protocol = $request->getScheme();
            $url = "{$protocol}://techzero.test/cart";
            
            // For Inertia requests, use Inertia::location() for external redirects
            if ($request->header('X-Inertia')) {
                return Inertia::location($url);
            }
            
            return redirect()->away($url);
        }

        // If user is a supplier, redirect to supplier subdomain dashboard
        if ($user->isSupplier()) {
            $protocol = $request->getScheme();
            $host = str_replace('app.', 'supplier.', $request->getHost());
            $url = "{$protocol}://{$host}/dashboard";
            
            // For Inertia requests, use Inertia::location() for external redirects
            if ($request->header('X-Inertia')) {
                return Inertia::location($url);
            }
            
            return redirect()->away($url);
        }

        // If user is admin, allow access to dashboard
        if ($user->isAdmin()) {
            return $next($request);
        }

        // Default: redirect to login if role is not recognized
        return redirect()->route('login');
    }
}
