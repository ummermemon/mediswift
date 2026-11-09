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
            $table->decimal('latitude', 10, 8)->change(); 
            $table->decimal('longitude', 11, 8)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patient_addresses', function (Blueprint $table) {
            $table->float('latitude', 10, 6)->change();
            $table->float('longitude', 10, 6)->change();
        });
    }
};
