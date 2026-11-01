<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pharmacists', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pharmacy_id'); 
            $table->dropColumn('designation');
        });
    }

    public function down(): void
    {
        Schema::table('pharmacists', function (Blueprint $table) {
            $table->foreignId('pharmacy_id')
                ->nullable()
                ->constrained('pharmacies')
                ->onDelete('cascade');

            $table->string('designation')->nullable();
        });
    }
};