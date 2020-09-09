<script lang="ts">
    import type {Params} from '../types';
    import {
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
        Container,
        Alert,
    } from 'sveltestrap';
    import Nav from '../components/Nav.svelte';
    import OutcomeDropdown from '../utils/OutcomeDropdown.svelte';
    import { banks } from '../banks';

    export let params:Params;
    let bank = $banks.find((b)=>b.slug==params.bankSlug)
</script>

<Nav {bank}/>

<Container>
    <h1>{bank.title}</h1>
    {#if bank.outcomes}
        <p>
            <OutcomeDropdown {bank}/>
        </p>
    {:else}
        <Alert color="warning">No outcomes found for this bank.</Alert>
    {/if}
</Container>

<style>
    h1 {margin-top: 0.5em;}
</style>