<script lang="ts">
    import type {Params} from '../types';
    import {
        Container,
        Alert,
    } from 'sveltestrap';
    import OutcomeDropdown from '../components/dropdowns/Outcome.svelte';
    import { banks } from '../stores/banks';
    import { embedMode } from '../stores/embed';
    import type { Outcome } from '../types';

    export let params:Params;
    $: bank = $banks.find((b)=>b.slug==params.bankSlug)
    let outcome: Outcome | undefined = undefined;
    $: if (params.outcomeSlug) {
        outcome = bank.outcomes.find((o)=>o.slug==params.outcomeSlug)
    }
</script>

<main>
    {#if $embedMode}
        <slot/>
    {:else}
    <Container>
        <h1>{bank.title}</h1>
        {#if bank.outcomes}
            <p>
                <OutcomeDropdown {bank} {outcome}/>
            </p>
        {:else}
            <Alert color="warning">No outcomes found for this bank.</Alert>
        {/if}
        <slot/>
    </Container>
    {/if}
</main>

<style>
    h1 {margin-top: 0.5em;}
</style>