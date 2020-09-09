<script lang="ts">
    import BankDropdown from '../utils/BankDropdown.svelte';
    import {
        Navbar,
        Nav,
    } from 'sveltestrap';
    import type { Bank } from '../types';
    
    export let bank: Bank | undefined = undefined;
</script>

<Navbar color="primary" dark expand="md">
    <a class="navbar-brand" href="#/">☑️It</a>
    {#if bank}
        <Nav navbar>
            <BankDropdown {bank} inNav/>
        </Nav>
    {/if}
</Navbar>
