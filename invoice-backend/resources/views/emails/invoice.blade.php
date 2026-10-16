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
<div style="max-width:720px;margin:0 auto;">
    <div style="background:#111827;padding:28px 32px;border-radius:16px 16px 0 0;color:#fff;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:top"><div style="font-size:12px;letter-spacing:2px;color:#a3e635;font-weight:bold">INVOICE</div><div style="font-size:28px;font-weight:bold;margin-top:8px">{{ $invoice->invoice_number }}</div></td>
            <td style="text-align:right;vertical-align:top;font-size:13px;color:#d1d5db;line-height:1.7"><strong style="color:#fff">{{ $invoice->from_name }}</strong><br>{{ $invoice->from_address }}<br>{{ $invoice->from_email }}@if($invoice->from_phone)<br>{{ $invoice->from_phone }}@endif</td>
        </tr></table>
    </div>
    <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:0">
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px"><tr>
            <td width="55%" style="vertical-align:top"><div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px">Ditagihkan kepada</div><div style="font-size:18px;font-weight:bold;margin-top:6px">{{ $invoice->to_name }}</div><div style="font-size:13px;color:#64748b;line-height:1.6">{{ $invoice->to_address }}<br>{{ $invoice->to_email }}</div></td>
            <td style="vertical-align:top;font-size:13px;line-height:1.8"><div><span style="color:#64748b">Tanggal terbit:</span> <strong>{{ $invoice->issue_date->format('d/m/Y') }}</strong></div><div><span style="color:#64748b">Jatuh tempo:</span> <strong>{{ $invoice->due_date->format('d/m/Y') }}</strong></div><div><span style="color:#64748b">Status:</span> <strong style="color:#65a30d">{{ ucfirst($invoice->status) }}</strong></div></td>
        </tr></table>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:13px">
            <tr style="background:#f8fafc;color:#64748b;text-transform:uppercase;font-size:11px"><th align="left" style="padding:12px 10px">Deskripsi</th><th align="right" style="padding:12px 10px">Qty</th><th align="right" style="padding:12px 10px">Harga</th><th align="right" style="padding:12px 10px">Jumlah</th></tr>
            @foreach($invoice->items as $item)<tr><td style="padding:14px 10px;border-bottom:1px solid #e5e7eb">{{ $item->description }}</td><td align="right" style="padding:14px 10px;border-bottom:1px solid #e5e7eb">{{ $item->qty }}</td><td align="right" style="padding:14px 10px;border-bottom:1px solid #e5e7eb">{{ number_format($item->price, 0, ',', '.') }}</td><td align="right" style="padding:14px 10px;border-bottom:1px solid #e5e7eb">{{ number_format($item->qty * $item->price, 0, ',', '.') }}</td></tr>@endforeach
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;font-size:13px"><tr><td align="right" style="padding:4px 10px;color:#64748b">Subtotal</td><td align="right" width="130" style="padding:4px 10px">{{ number_format($invoice->subtotal, 0, ',', '.') }}</td></tr>@if($invoice->discount_percent > 0)<tr><td align="right" style="padding:4px 10px;color:#64748b">Diskon ({{ $invoice->discount_percent }}%)</td><td align="right" style="padding:4px 10px">-{{ number_format($invoice->discount, 0, ',', '.') }}</td></tr>@endif @if($invoice->tax_percent > 0)<tr><td align="right" style="padding:4px 10px;color:#64748b">Pajak ({{ $invoice->tax_percent }}%)</td><td align="right" style="padding:4px 10px">{{ number_format($invoice->tax, 0, ',', '.') }}</td></tr>@endif<tr><td align="right" style="padding:14px 10px 4px;font-size:16px;font-weight:bold;border-top:2px solid #111827">Total</td><td align="right" style="padding:14px 10px 4px;font-size:16px;font-weight:bold;border-top:2px solid #111827">{{ $invoice->currency }} {{ number_format($invoice->total, 0, ',', '.') }}</td></tr></table>
        @if($invoice->notes)<div style="margin-top:24px;padding:14px 16px;background:#f8fafc;border-left:4px solid #a3e635;font-size:13px"><strong>Catatan</strong><br>{{ $invoice->notes }}</div>@endif
    </div>
    <div style="background:#fff;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;color:#64748b;font-size:12px">PDF invoice terlampir di bawah email ini untuk diunduh atau disimpan.</div>
</div>
</body>
</html>