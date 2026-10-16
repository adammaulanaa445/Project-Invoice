<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{ $invoice->invoice_number }}</title>
</head>
<body style="margin:0;padding:24px 12px;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#172033;">
@if($previewImageData)
    <div style="max-width:720px;margin:0 auto 16px;text-align:center;background:#fff;border-radius:16px;padding:12px;">
        <img src="{{ $message->embedData(base64_decode($previewImageData), 'invoice-preview.jpg', 'image/jpeg') }}" alt="Invoice {{ $invoice->invoice_number }}" style="display:block;width:100%;height:auto;border-radius:10px;">
    </div>
@endif
@unless($previewImageData)
    <div style="max-width:720px;margin:0 auto;background:#fff;padding:24px;border-radius:12px;">
        <strong>Invoice {{ $invoice->invoice_number }}</strong><br>
        Detail invoice ada di PDF terlampir.
    </div>
@endunless
<div style="max-width:720px;margin:16px auto 0;text-align:center;color:#64748b;font:12px Arial,Helvetica,sans-serif;">
    PDF invoice terlampir di bawah email ini.
</div>
</body>
</html>