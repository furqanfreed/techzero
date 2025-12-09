<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class SetGlobalUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $globalUserRole = $user ? $user->role : null;

        // Share with views - accessible as $globalUserRole in Blade templates
        View::share('globalUserRole', $globalUserRole);

        // Bind to container - accessible in controllers via app('globalUserRole')
        app()->instance('globalUserRole', $globalUserRole);

        return $next($request);
    }
}
