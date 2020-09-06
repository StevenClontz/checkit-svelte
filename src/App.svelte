<script lang="ts">
  import Nav from './Nav.svelte';
  import Jumbotron from './Jumbotron.svelte';
	import { onMount } from 'svelte';
  import { Container } from 'sveltestrap';

	let bank = {
		"title": "Loading...",
		"slug": "loading",
		"outcomes": [],
	};
	onMount(async () => {
		const res = await fetch(`bank.json`);
		bank = await res.json();
	});
</script>

<Nav/>

<Jumbotron/>

<Container>
<h1>{bank.title}</h1>
{#each bank.outcomes as outcome}
<pre>{outcome.name}</pre>
{:else}
<pre>Loading...</pre>
{/each}
</Container>