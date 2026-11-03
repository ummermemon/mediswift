<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::table('pharmacies', function (Blueprint $table) {
            $table->string('address_line_1');
            $table->string('address_line_2')->nullable();
            $table->string('city');
            $table->string('state');
            $table->float('pincode', 10, 6);
            $table->float('latitude')->nullable();
            $table->integer('longitude')->nullable();
            $table->renameColumn('is_active', 'is_online');
            $table->enum('approval_status', ['pending', 'approved', 'rejected'])->default('pending')->after('is_online');
            $table->enum('status', ['active', 'inactive'])->default('inactive')->after('approval_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pharmacies', function (Blueprint $table) {
            $table->dropColumn('address_line_1');
            $table->dropColumn('address_line_2');
            $table->dropColumn('city');
            $table->dropColumn('state');
            $table->dropColumn('pincode');
            $table->dropColumn('latitude');
            $table->dropColumn('longitude');
            $table->renameColumn('is_online', 'is_active');
            $table->dropColumn('approval_status');
            $table->dropColumn('status');
        });
    }
};
