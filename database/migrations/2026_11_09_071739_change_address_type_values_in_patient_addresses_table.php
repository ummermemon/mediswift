<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('patient_addresses', function (Blueprint $table) {
            $table->enum('address_type', ['Home', 'Work', 'Other'])->default('Home')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_addresses', function (Blueprint $table) {
            $table->enum('address_type', ['home', 'work', 'other'])->default('home')->change();
        });
    }
};
