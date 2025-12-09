<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Application Domains
    |--------------------------------------------------------------------------
    |
    | This configuration file contains all domain-related settings for the
    | application. These values can be overridden in your .env file.
    |
    | For local development: techzero.test
    | For production: techzero.com
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Main Domain
    |--------------------------------------------------------------------------
    |
    | The main domain for the landing page and public-facing e-commerce site.
    | This is the root domain without any subdomain prefix.
    |
    */

    'main' => env('DOMAIN_MAIN', 'techzero.test'),

    /*
    |--------------------------------------------------------------------------
    | App Subdomain
    |--------------------------------------------------------------------------
    |
    | The subdomain for the admin and supplier dashboard and application management system.
    | This will be prefixed to the main domain (e.g., app.techzero.test).
    | Both admins and suppliers access the dashboard through this domain.
    |
    */

    'app' => env('DOMAIN_APP', 'app.techzero.test'),

    /*
    |--------------------------------------------------------------------------
    | Session Cookie Domain
    |--------------------------------------------------------------------------
    |
    | The domain for session cookies. Should start with a dot (.) to allow
    | cookies to be shared across all subdomains.
    |
    */

    'session' => env('DOMAIN_SESSION', '.techzero.test'),

    /*
    |--------------------------------------------------------------------------
    | Contact Email Domain
    |--------------------------------------------------------------------------
    |
    | The email domain for contact information. This is used in the contact
    | page and footer.
    |
    */

    'email' => env('DOMAIN_EMAIL', 'info@techzero.test'),

];
