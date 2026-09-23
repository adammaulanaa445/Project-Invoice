<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">

    <p>Halo,</p>

    <p>
        Berikut invoice <strong>{{ $invoice->invoice_number }}</strong>
        dari <strong>{{ $invoice->from_name }}</strong>.
    </p>

    <table style="margin: 16px 0;">
        <tr>
            <td style="padding-right: 12px; opacity: 0.7;">Tanggal terbit</td>
            <td>: {{ $invoice->issue_date }}</td>
        </tr>
        <tr>
            <td style="padding-right: 12px; opacity: 0.7;">Jatuh tempo</td>
            <td>: {{ $invoice->due_date }}</td>
        </tr>
        <tr>
            <td style="padding-right: 12px; opacity: 0.7;">Status</td>
            <td>: {{ ucfirst($invoice->status) }}</td>
        </tr>
    </table>

    <p>File PDF invoice terlampir pada email ini.</p>

    <p style="margin-top: 24px;">
        Terima kasih.<br>
        {{ $invoice->from_name }}
    </p>

</body>
</html>
