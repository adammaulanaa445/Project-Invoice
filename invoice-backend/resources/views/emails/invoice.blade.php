<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice {{ $invoice->invoice_number }}</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

    <h2>Invoice {{ $invoice->invoice_number }}</h2>

    <p>Halo {{ $invoice->to_name }},</p>

    <p>
        Berikut adalah invoice dari
        <strong>{{ $invoice->from_name }}</strong>.
    </p>

    <p>
        Nomor Invoice:
        <strong>{{ $invoice->invoice_number }}</strong>
    </p>

    <p>
        Tanggal:
        {{ $invoice->issue_date->format('d/m/Y') }}
    </p>

    <p>
        Jatuh Tempo:
        {{ $invoice->due_date->format('d/m/Y') }}
    </p>

    <p>
        Invoice lengkap dapat dilihat pada file PDF
        yang terlampir pada email ini.
    </p>

    @if($invoice->notes)
        <p>
            <strong>Catatan:</strong><br>
            {{ $invoice->notes }}
        </p>
    @endif

    <p>
        Terima kasih.
    </p>

    <p>
        <strong>{{ $invoice->from_name }}</strong>
    </p>

</body>
</html>