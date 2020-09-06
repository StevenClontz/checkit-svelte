<script lang="ts">
    import {
        Navbar,
        NavbarBrand,
        Nav,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from 'sveltestrap';

    import type {Bank} from './types';
    export let bank: Bank | undefined;
    export let banks: Array<Bank>;

    function unsetBank() {
        bank = undefined;
    }
</script>

<Navbar color="primary" dark expand="md">
    <a class="navbar-brand" on:click|preventDefault={unsetBank} href="/">☑️It</a>
    {#if bank}
        <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{bank.title}</DropdownToggle>
                <DropdownMenu left>
                    <DropdownItem on:click={unsetBank}>Back to Home</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    {/if}
</Navbar>
