<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { theme } from '$lib/theme.svelte.js';
	import { lang } from '$lib/lang.svelte.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
		lang.init();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}