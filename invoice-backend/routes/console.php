<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

use App\Jobs\SendScheduledInvoiceEmail;
use App\Models\ScheduledInvoiceEmail;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {

    $emails = ScheduledInvoiceEmail::where(
        'status',
        'scheduled'
    )
        ->where(
            'scheduled_at',
            '<=',
            now()
        )
        ->get();

    foreach ($emails as $email) {
        SendScheduledInvoiceEmail::dispatch($email);
    }

})->everyMinute();

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
