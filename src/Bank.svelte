<script lang="ts">
	import { Container, Alert } from 'sveltestrap';
	import type { Bank } from './types';
	export let bank: Bank;
</script>

<Container>
<h1>{bank.title}</h1>
{#if bank.outcomes}
<ul>
	{#each bank.outcomes as outcome}
	<li>{outcome.title}</li>
	{/each}
</ul>
{:else}
<Alert color="warning">No outcomes found for this bank.</Alert>
{/if}
</Container>