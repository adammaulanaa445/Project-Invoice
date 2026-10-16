<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice {{ $invoice->invoice_number }}</title>
</head>
<body style="margin:0;padding:32px 16px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#172033;">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;">
        <div style="font-size:16px;line-height:1.7;margin-bottom:24px;">
            <p style="margin:0 0 12px;">Halo {{ $invoice->to_name ?? 'Bapak/Ibu' }},</p>
            <p style="margin:0;">Berikut invoice Anda dari <strong>{{ $invoice->from_name }}</strong>.</p>
            <p style="margin:0;">Silakan lihat preview invoice di bawah. File PDF tersedia sebagai lampiran untuk diunduh.</p>
        </div>

        @if($previewImageData ?? null)
            <div style="margin:0 0 24px;text-align:center;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;padding:12px;">
                <img src="{{ $message->embedData(base64_decode($previewImageData), 'invoice-preview.jpg', 'image/jpeg') }}" alt="Preview Invoice {{ $invoice->invoice_number }}" style="display:block;width:100%;height:auto;border-radius:8px;">
            </div>
        @else
            <div style="margin:0 0 24px;padding:20px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:12px;text-align:center;">
                <strong>Invoice {{ $invoice->invoice_number }}</strong><br>
                <span style="color:#64748b;font-size:13px;">Preview tidak tersedia. Silakan unduh PDF terlampir.</span>
            </div>
        @endif

        <div style="padding-top:20px;border-top:1px solid #e5e7eb;font-size:13px;line-height:1.6;color:#64748b;">
            <strong style="color:#172033;">Invoice {{ $invoice->invoice_number }}</strong><br>
            PDF invoice terlampir di email ini untuk diunduh atau disimpan.
        </div>
    </div>
</body>
</html>