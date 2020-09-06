<script lang="ts">
	import BankComponent from './Bank.svelte';
	import Jumbotron from './Jumbotron.svelte';
	import Front from './Front.svelte';
	import Nav from './Nav.svelte';
	import { onMount } from 'svelte';
	import type { Bank } from './types';

	let bank: Bank | undefined = undefined;
	onMount(async () => {
		const res = await fetch(`bank.json`);
		bank = await res.json();
	});
</script>

<Nav/>

{#if bank}
<BankComponent bank={bank}/>
{:else}
<Jumbotron/>
<Front/>
{/if}