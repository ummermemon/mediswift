<?php

namespace Tests\Feature;

use Tests\TestCase;

class SuperAdminDashboardTest extends TestCase
{
    public function test_superadmin_dashboard_page_loads(): void
    {
        $response = $this->get('/superadmin');

        $response->assertStatus(200);
        $response->assertSee('Superadmin Dashboard');
    }
}
