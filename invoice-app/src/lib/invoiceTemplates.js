import { lang } from "$lib/lang.svelte.js";

import Invoice01Neat from "$lib/components/invoices/Invoice01Neat.svelte";
import Invoice02Corporate from "$lib/components/invoices/Invoice02Corporate.svelte";
import Invoice03BoldBand from "$lib/components/invoices/Invoice03BoldBand.svelte";
import Invoice04Gradient from "$lib/components/invoices/Invoice04Gradient.svelte";
import Invoice05DarkStudio from "$lib/components/invoices/Invoice05DarkStudio.svelte";
import Invoice06Luxury from "$lib/components/invoices/Invoice06Luxury.svelte";
import Invoice07Asymmetric from "$lib/components/invoices/Invoice07Asymmetric.svelte";
import Invoice08NatureEco from "$lib/components/invoices/Invoice08NatureEco.svelte";
import Invoice09TechStartup from "$lib/components/invoices/Invoice09TechStartup.svelte";
import Invoice10Freelance from "$lib/components/invoices/Invoice10Freelance.svelte";
import InvoiceBoldTypography from "$lib/components/invoices/InvoiceBoldTypography.svelte";
import InvoiceDarkTech from "$lib/components/invoices/InvoiceDarkTech.svelte";
import InvoiceEditorialKoran from "$lib/components/invoices/InvoiceEditorialKoran.svelte";
import InvoiceEleganEmas from "$lib/components/invoices/InvoiceEleganEmas.svelte";
import InvoiceGradientVibrant from "$lib/components/invoices/InvoiceGradientVibrant.svelte";
import InvoiceKlasikFormal from "$lib/components/invoices/InvoiceKlasikFormal.svelte";
import InvoiceKorporatBiru from "$lib/components/invoices/InvoiceKorporatBiru.svelte";
import InvoiceModernMinimalis from "$lib/components/invoices/InvoiceModernMinimalis.svelte";
import InvoiceNordicEarthy from "$lib/components/invoices/InvoiceNordicEarthy.svelte";
import InvoicePastelPlayful from "$lib/components/invoices/InvoicePastelPlayful.svelte";
import InvoiceRetroVintage from "$lib/components/invoices/InvoiceRetroVintage.svelte";
import InvoiceTechSaaS from "$lib/components/invoices/InvoiceTechSaaS.svelte";
import InvoiceCurvedTeal from "$lib/components/invoices/InvoiceCurvedTeal.svelte";
import InvoicePixelReceipt from "$lib/components/invoices/InvoicePixelReceipt.svelte";
import InvoiceLedgerKlasik from "$lib/components/invoices/InvoiceLedgerKlasik.svelte";
import InvoiceSwissGrid from "$lib/components/invoices/InvoiceSwissGrid.svelte";
import InvoiceMotifWarm from "$lib/components/invoices/InvoiceMotifWarm.svelte";
import InvoiceMinimalisMono from "$lib/components/invoices/InvoiceMinimalisMono.svelte";
import InvoiceStudioHitam from "$lib/components/invoices/InvoiceStudioHitam.svelte";
import InvoiceBrutalistBracket from "$lib/components/invoices/InvoiceBrutalistBracket.svelte";
import InvoiceEditorialMerah from "$lib/components/invoices/InvoiceEditorialMerah.svelte";
import InvoiceSidebarBiru from "$lib/components/invoices/InvoiceSidebarBiru.svelte";
import InvoiceAuroraNight from "$lib/components/invoices/InvoiceAuroraNight.svelte";
import InvoiceCreamMonogramme from "$lib/components/invoices/InvoiceCreamMonogramme.svelte";
import InvoiceDottedBlueWave from "$lib/components/invoices/InvoiceDottedBlueWave.svelte";
import InvoiceIndigoSwirl from "$lib/components/invoices/InvoiceIndigoSwirl.svelte";
import InvoiceCrimsonVAT from "$lib/components/invoices/InvoiceCrimsonVAT.svelte";
import InvoicePillRowsIndigo from "$lib/components/invoices/InvoicePillRowsIndigo.svelte";
import InvoiceSignatureCream from "$lib/components/invoices/InvoiceSignatureCream.svelte";
import InvoiceLavenderSoft from "$lib/components/invoices/InvoiceLavenderSoft.svelte";
import InvoiceCoralGradientBar from "$lib/components/invoices/InvoiceCoralGradientBar.svelte";
import InvoiceSlateCorporate from "$lib/components/invoices/InvoiceSlateCorporate.svelte";

export const templates = [
  { name: () => `1. ${lang.t("tpl1_name")}`, component: Invoice01Neat },
  { name: () => `2. ${lang.t("tpl2_name")}`, component: Invoice02Corporate },
  { name: () => `3. ${lang.t("tpl3_name")}`, component: Invoice03BoldBand },
  { name: () => `4. ${lang.t("tpl4_name")}`, component: Invoice04Gradient },
  { name: () => `5. ${lang.t("tpl5_name")}`, component: Invoice05DarkStudio },
  { name: () => `6. ${lang.t("tpl6_name")}`, component: Invoice06Luxury },
  { name: () => `7. ${lang.t("tpl7_name")}`, component: Invoice07Asymmetric },
  { name: () => `8. ${lang.t("tpl8_name")}`, component: Invoice08NatureEco },
  { name: () => `9. ${lang.t("tpl9_name")}`, component: Invoice09TechStartup },
  { name: () => `10. ${lang.t("tpl10_name")}`, component: Invoice10Freelance },
  { name: () => `11. ${lang.t("tpl11_name")}`, component: InvoiceBoldTypography },
  { name: () => `12. ${lang.t("tpl12_name")}`, component: InvoiceDarkTech },
  { name: () => `13. ${lang.t("tpl13_name")}`, component: InvoiceEditorialKoran },
  { name: () => `14. ${lang.t("tpl14_name")}`, component: InvoiceEleganEmas },
  { name: () => `15. ${lang.t("tpl15_name")}`, component: InvoiceGradientVibrant },
  { name: () => `16. ${lang.t("tpl16_name")}`, component: InvoiceKlasikFormal },
  { name: () => `17. ${lang.t("tpl17_name")}`, component: InvoiceKorporatBiru },
  { name: () => `18. ${lang.t("tpl18_name")}`, component: InvoiceModernMinimalis },
  { name: () => `19. ${lang.t("tpl19_name")}`, component: InvoiceNordicEarthy },
  { name: () => `20. ${lang.t("tpl20_name")}`, component: InvoicePastelPlayful },
  { name: () => `21. ${lang.t("tpl21_name")}`, component: InvoiceRetroVintage },
  { name: () => `22. ${lang.t("tpl22_name")}`, component: InvoiceTechSaaS },
  { name: () => `23. ${lang.t("tpl23_name")}`, component: InvoiceCurvedTeal },
  { name: () => `24. ${lang.t("tpl24_name")}`, component: InvoicePixelReceipt },
  { name: () => `25. ${lang.t("tpl25_name")}`, component: InvoiceLedgerKlasik },
  { name: () => `26. ${lang.t("tpl26_name")}`, component: InvoiceSwissGrid },
  { name: () => `27. ${lang.t("tpl27_name")}`, component: InvoiceMotifWarm },
  { name: () => `28. ${lang.t("tpl28_name")}`, component: InvoiceMinimalisMono },
  { name: () => `29. ${lang.t("tpl29_name")}`, component: InvoiceStudioHitam },
  { name: () => `30. ${lang.t("tpl30_name")}`, component: InvoiceBrutalistBracket },
  { name: () => `31. ${lang.t("tpl31_name")}`, component: InvoiceEditorialMerah },
  { name: () => `32. ${lang.t("tpl32_name")}`, component: InvoiceSidebarBiru },
  { name: () => `33. Aurora Night`, component: InvoiceAuroraNight },
  { name: () => `34. Cream Monogramme`, component: InvoiceCreamMonogramme },
  { name: () => `35. Dotted Blue Wave`, component: InvoiceDottedBlueWave },
  { name: () => `36. Indigo Swirl`, component: InvoiceIndigoSwirl },
  { name: () => `37. Crimson VAT`, component: InvoiceCrimsonVAT },
  { name: () => `38. Pill Rows Indigo`, component: InvoicePillRowsIndigo },
  { name: () => `39. Signature Cream`, component: InvoiceSignatureCream },
  { name: () => `40. Lavender Soft`, component: InvoiceLavenderSoft },
  { name: () => `41. Coral Gradient Bar`, component: InvoiceCoralGradientBar },
  { name: () => `42. Slate Corporate`, component: InvoiceSlateCorporate },
];