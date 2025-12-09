<?php

if (!function_exists('globalUserRole')) {
    /**
     * Get the global user role.
     *
     * @return string|null
     */
    function globalUserRole(): ?string
    {
        return app('globalUserRole');
    }
}
