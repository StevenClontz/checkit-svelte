<script lang="ts">
    import {
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Container,
        Row,
        Alert,
    } from 'sveltestrap';
    import type { Bank, Outcome } from './types';
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
        <UncontrolledDropdown>
            <DropdownToggle caret>
                {#if outcome}
                    {outcome.slug} - {outcome.title}
                {:else}
                    Select an outcome:
                {/if}
            </DropdownToggle>
            <DropdownMenu>
                {#each bank.outcomes as o}
                    <DropdownItem on:click={() => outcome = o}>{o.slug} - {o.title}</DropdownItem>
                {/each}
            </DropdownMenu>
        </UncontrolledDropdown>
    {:else}
        <Alert color="warning">No outcomes found for this bank.</Alert>
    {/if}

    {#if outcome}
        <hr/>
        <h3>{outcome.slug} - {outcome.title}</h3>
    {/if}
</Container>