<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Hapus kolom versi lama (kirim sekali) yang sudah tidak dipakai
        Schema::table('scheduled_invoice_emails', function (Blueprint $table) {
            $table->dropColumn(['scheduled_at', 'pdf_path']);
        });

        // Tambahkan kolom-kolom baru untuk jadwal berulang
        Schema::table('scheduled_invoice_emails', function (Blueprint $table) {
            $table->enum('frequency', [
                'once',
                'hourly',
                'daily',
                'weekly',
                'monthly',
            ])->default('once')->after('recipient_email');

            $table->timestamp('next_send_at')->after('frequency');
            $table->timestamp('last_sent_at')->nullable()->after('next_send_at');
            $table->unsignedInteger('send_count')->default(0)->after('last_sent_at');
            $table->text('last_error')->nullable();
        });

        // Ganti pilihan status lama (scheduled/sent) jadi pilihan baru (active/completed)
        DB::statement(
            "ALTER TABLE scheduled_invoice_emails MODIFY status ENUM('active','completed','cancelled','failed') DEFAULT 'active'"
        );

        // Mempermudah scheduler mencari jadwal yang harus dikirim
        Schema::table('scheduled_invoice_emails', function (Blueprint $table) {
            $table->index(['status', 'next_send_at']);
        });
    }

    public function down(): void
    {
        Schema::table('scheduled_invoice_emails', function (Blueprint $table) {
            $table->dropIndex(['scheduled_invoice_emails_status_next_send_at_index']);
            $table->dropColumn(['frequency', 'next_send_at', 'last_sent_at', 'send_count', 'last_error']);
        });

        Schema::table('scheduled_invoice_emails', function (Blueprint $table) {
            $table->timestamp('scheduled_at')->nullable();
            $table->string('pdf_path')->nullable();
        });

        DB::statement(
            "ALTER TABLE scheduled_invoice_emails MODIFY status ENUM('scheduled','sent','failed','cancelled') DEFAULT 'scheduled'"
        );
    }
};
