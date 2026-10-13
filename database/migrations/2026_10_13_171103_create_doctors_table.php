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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('specialty_id')->constrained('doctor_specialties')->onDelete('cascade');
            $table->string('license_no')->unique();
            $table->string('license_file');
            $table->string('degree_file');
            $table->string('pan_card');
            $table->string('aadhar_card');
            $table->enum('status', ['active', 'inactive'])->default('inactive');
            $table->boolean('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
