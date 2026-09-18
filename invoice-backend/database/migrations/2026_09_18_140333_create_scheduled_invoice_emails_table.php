<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scheduled_invoice_emails', function (Blueprint $table) {
            $table->id();

            $table->foreignId('invoice_id')
                ->constrained('invoices')
                ->cascadeOnDelete();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('recipient_email');

            $table->timestamp('scheduled_at');

            $table->string('pdf_path')->nullable();

            $table->enum('status', [
                'scheduled',
                'sent',
                'failed',
                'cancelled'
            ])->default('scheduled');

            $table->timestamps();

            // Mempermudah pencarian jadwal yang harus dikirim
            $table->index(['status', 'scheduled_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_invoice_emails');
    }
};