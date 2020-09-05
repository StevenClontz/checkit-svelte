<script lang="ts">
	import { onMount } from 'svelte';
	let bank = {
		"title": "Loading...",
		"slug": "loading",
		"outcomes": [],
	}
	onMount(async () => {
		const res = await fetch(`bank.json`);
		bank = await res.json();
	});
</script>

<main>
	<h1>{bank.title}</h1>
</main>
{#each bank.outcomes as outcome}
<pre>{outcome.name}</pre>
{:else}
<pre>Loading...</pre>
{/each}

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>