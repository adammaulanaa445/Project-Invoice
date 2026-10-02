<script>
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import { templates } from "$lib/invoiceTemplates.js";

    // GANTI ke URL backend production (Railway) kalau sudah deploy.
    const API_BASE = "http://localhost:8000/api";

    let invoice = $state(null);
    let templateId = $state(1);
    let loading = $state(true);
    let error = $state("");

    onMount(async () => {
        const id = page.params.id;
        const token = page.url.searchParams.get("token");

        try {
            const res = await fetch(
                `${API_BASE}/public/invoices/${id}?token=${token}`,
            );

            if (!res.ok) {
                throw new Error("Invoice tidak ditemukan atau token salah.");
            }

            const data = await res.json();

            templateId = data.template_id || 1;

            invoice = {
                invoiceNumber: data.invoice_number,
                issueDate: data.issue_date,
                dueDate: data.due_date,
                currency: data.currency,
                logoUrl: data.logo_url || "",

                from: {
                    name: data.from_name,
                    address: data.from_address,
                    email: data.from_email,
                    phone: data.from_phone,
                },

                to: {
                    name: data.to_name,
                    address: data.to_address,
                    email: data.to_email,
                },

                items: (data.items || []).map((i) => ({
                    description: i.description,
                    qty: i.qty,
                    price: i.price,
                })),

                taxPercent: data.tax_percent,
                discountPercent: data.discount_percent,
                notes: data.notes,
                status: data.status,
            };
        } catch (e) {
            console.error("Load public invoice error:", e);
            error = e.message || "Gagal memuat invoice.";
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>{invoice ? `Invoice ${invoice.invoiceNumber}` : "Invoice"}</title>
</svelte:head>

<!--
  Halaman ini SENGAJA polos: tanpa sidebar, navbar, atau elemen interaktif
  lain. Yang membuka halaman ini bukan manusia, tapi Browsershot (headless
  browser) di server, untuk di-screenshot jadi PDF.
-->

<div class="print-wrapper">
    {#if loading}
        <p style="padding: 24px; font-family: sans-serif;">Memuat invoice...</p>
    {:else if error}
        <p style="padding: 24px; font-family: sans-serif; color: red;">
            {error}
        </p>
    {:else if invoice}
        <svelte:component
            this={templates[templateId - 1]?.component ??
                templates[0].component}
            {invoice}
        />
    {/if}
</div>

<style>
    :global(html),
    :global(body) {
        margin: 0;
        padding: 0;
        background: white;
    }

    .print-wrapper {
        width: 800px;
    }
</style>
