<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::table('pharmacists', function (Blueprint $table) {
            $table->dropColumn('pan_card_no');
            $table->string('pancard_no')->unique()->after('user_id');
        });
    }

    
    public function down(): void
    {
        Schema::table('pharmacists', function (Blueprint $table) {
            $table->dropColumn('pancard_no');
            $table->string('pan_card_no')->unique()->after('user_id');
        });
    }
};
