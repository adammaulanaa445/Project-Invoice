<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{ $invoice->invoice_number }}</title>
</head>
<body style="margin:0;padding:24px 12px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#172033;">
    <div style="max-width:900px;margin:0 auto;">
        <p style="margin:0 0 16px;font-size:14px;line-height:1.5;color:#475569;">
            Halo {{ $invoice->to_name ?: 'Bapak/Ibu' }}, berikut invoice dari
            <strong>{{ $invoice->from_name ?: 'kami' }}</strong>. PDF resmi juga terlampir.
        </p>
        <img
            src="{{ $message->embedData($previewImageData, 'invoice-' . $invoice->invoice_number . '.png', 'image/png') }}"
            alt="Invoice {{ $invoice->invoice_number }}"
            style="display:block;width:100%;height:auto;border:0;"
        >
    </div>
</body>
</html>
