<script lang="ts">
    import {
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Container,
        Alert,
    } from 'sveltestrap';
    import type { Bank, Outcome } from './types';
    import OutcomeComponent from './Outcome.svelte'
    import OutcomeDropdown from '../utils/OutcomeDropdown.svelte'

    export let bank: Bank;

    let outcome: Outcome | undefined = undefined;
    let oldBankSlug = bank.slug;
    $: if (bank.slug !== oldBankSlug) {
        outcome = undefined;
        oldBankSlug = bank.slug;
    }
</script>

<Container>
    <h1>{bank.title}</h1>
    {#if bank.outcomes}
        <p>
            <OutcomeDropdown {bank} {outcome}/>
        </p>
    {:else}
        <Alert color="warning">No outcomes found for this bank.</Alert>
    {/if}

    {#if outcome}
        <OutcomeComponent {outcome}/>
    {/if}
</Container>

<style>
    h1 {margin-top: 0.5em;}
</style>