<?php

$providers = [
    App\Providers\AppServiceProvider::class,
    App\Providers\FortifyServiceProvider::class,
];

// Only register Telescope in local environment
if (app()->environment('local')) {
    $providers[] = App\Providers\TelescopeServiceProvider::class;
}

return $providers;
