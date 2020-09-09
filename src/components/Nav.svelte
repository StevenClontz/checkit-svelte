<script lang="ts">
    import BankDropdown from '../utils/BankDropdown.svelte';
    import {
        Navbar,
        Nav,
    } from 'sveltestrap';
    import type {Params} from '../types';
    
    export let params:Params = {'bankSlug': undefined};
</script>

<Navbar color="primary" dark expand="md">
    <a class="navbar-brand" href="#/">☑️It</a>
    {#if params.bankSlug}
        <Nav navbar>
            <BankDropdown inNav/>
        </Nav>
    {/if}
</Navbar>
