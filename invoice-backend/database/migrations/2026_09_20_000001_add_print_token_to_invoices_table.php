<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            // Token acak supaya halaman cetak (dipakai Browsershot) bisa diakses
            // tanpa login, tapi tetap tidak sembarang orang bisa menebak URL-nya.
            $table->string('print_token', 64)->nullable()->unique()->after('invoice_number');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn('print_token');
        });
    }
};
