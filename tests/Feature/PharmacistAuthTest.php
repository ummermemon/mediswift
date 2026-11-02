<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PharmacistAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_pharmacists_can_log_in_through_pharmacist_endpoint(): void
    {
        User::create([
            'first_name' => 'Test',
            'last_name' => 'Pharmacist',
            'email' => 'pharmacist@example.com',
            'role' => 'pharmacist',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'first_name' => 'Test',
            'last_name' => 'Patient',
            'email' => 'patient@example.com',
            'role' => 'patient',
            'password' => Hash::make('password'),
        ]);

        $this->postJson('/api/pharmacist/login', [
            'email' => 'pharmacist@example.com',
            'password' => 'password',
        ])->assertOk()
            ->assertJsonPath('message', 'Login successful')
            ->assertJsonStructure(['access_token']);

        $this->postJson('/api/pharmacist/login', [
            'email' => 'patient@example.com',
            'password' => 'password',
        ])->assertUnauthorized()
            ->assertJsonPath('message', 'Invalid credentials');
    }
}
