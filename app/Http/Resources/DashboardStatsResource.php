<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardStatsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'total_products' => $this->resource['total_products'] ?? 0,
            'total_orders' => $this->resource['total_orders'] ?? 0,
            'total_users' => $this->resource['total_users'] ?? 0,
            'revenue' => (float) ($this->resource['revenue'] ?? 0),
        ];
    }
}
