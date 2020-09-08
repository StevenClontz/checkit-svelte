<script lang="ts">
    import BankDropdown from './BankDropdown.svelte';
    import {
        Navbar,
        Nav,
    } from 'sveltestrap';
    import type {Bank} from './types';

    export let bank: Bank | undefined;
    export let banks: Array<Bank>;

    const unsetBank = () => bank = undefined;
</script>

<Navbar color="primary" dark expand="md">
    <a class="navbar-brand" on:click|preventDefault={unsetBank} href="/">☑️It</a>
    {#if bank}
        <Nav navbar>
            <BankDropdown active inNav bind:bank={bank} {banks}/>
        </Nav>
    {/if}
</Navbar>
