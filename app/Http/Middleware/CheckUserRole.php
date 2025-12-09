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
            $mainDomain = config('domains.main');
            $url = "{$protocol}://{$mainDomain}/cart";
            
            // For Inertia requests, use Inertia::location() for external redirects
            if ($request->header('X-Inertia')) {
                return Inertia::location($url);
            }
            
            return redirect()->away($url);
        }

        // If user is admin or supplier, allow access to app domain dashboard
        if ($user->isAdmin() || $user->isSupplier()) {
            return $next($request);
        }

        // Default: redirect to login if role is not recognized
        return redirect()->route('login');
    }
}
