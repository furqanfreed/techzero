<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetCookieDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Set cookie domain for all cookies to share across subdomains
        $domain = config('domains.session');
        
        // Update all cookies in the response to use the shared domain
        foreach ($response->headers->getCookies() as $cookie) {
            $response->headers->setCookie(
                $cookie->withDomain($domain)
            );
        }

        return $response;
    }
}
