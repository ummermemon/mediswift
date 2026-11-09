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
        $this->replacePatientForeignKey('patients');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $this->replacePatientForeignKey('users');
    }

    private function replacePatientForeignKey(string $referencedTable): void
    {
        $foreignKeys = array_values(array_filter(
            Schema::getForeignKeys('patient_addresses'),
            static fn (array $foreignKey): bool => in_array('patient_id', $foreignKey['columns'], true),
        ));

        Schema::table('patient_addresses', function (Blueprint $table) use ($foreignKeys, $referencedTable) {
            foreach ($foreignKeys as $foreignKey) {
                if ($foreignKey['name'] === null) {
                    throw new RuntimeException('Unable to determine the name of the patient_id foreign key.');
                }

                $table->dropForeign($foreignKey['name']);
            }

            $table->foreign('patient_id')->references('id')->on($referencedTable)->onDelete('cascade');
        });
    }
};
