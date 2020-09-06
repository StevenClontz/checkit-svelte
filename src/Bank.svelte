<script lang="ts">
	import { Container } from 'sveltestrap';
	import type { Bank } from './types';
	export let bank: Bank;
</script>

<Container>
<h1>{bank.title}</h1>
{#each bank.outcomes as outcome}
<pre>{outcome.title}</pre>
{:else}
<pre>Loading...</pre>
{/each}
</Container>