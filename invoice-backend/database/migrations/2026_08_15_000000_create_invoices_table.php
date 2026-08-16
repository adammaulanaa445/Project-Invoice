<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('invoice_number')->unique();
            $table->unsignedSmallInteger('template_id')->default(1); // pilih 1 dari 10+ desain UI
            $table->date('issue_date');
            $table->date('due_date');
            $table->string('currency', 3)->default('IDR');

            // Data pengirim (bisa juga ditarik dari tabel companies terpisah)
            $table->string('from_name');
            $table->text('from_address')->nullable();
            $table->string('from_email')->nullable();
            $table->string('from_phone')->nullable();
            $table->string('logo_url')->nullable();

            // Data klien
            $table->string('to_name');
            $table->text('to_address')->nullable();
            $table->string('to_email')->nullable();

            $table->decimal('tax_percent', 5, 2)->default(0);
            $table->decimal('discount_percent', 5, 2)->default(0);
            $table->text('notes')->nullable();

            $table->enum('status', ['unpaid', 'paid', 'overdue'])->default('unpaid');
            $table->string('payment_link')->nullable();

            $table->timestamps();
        });

        Schema::create('invoice_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invoice_id')->constrained()->cascadeOnDelete();
            $table->string('description');
            $table->unsignedInteger('qty')->default(1);
            $table->decimal('price', 15, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoice_items');
        Schema::dropIfExists('invoices');
    }
};