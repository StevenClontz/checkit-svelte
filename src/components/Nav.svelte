<script lang="ts">
    import BankDropdown from '../utils/BankDropdown.svelte';
    import {
        Navbar,
        NavbarBrand,
        NavItem,
        NavLink,
        Nav,
        Input,
        FormGroup,
        Label,
        Collapse,
        NavbarToggler,
    } from 'sveltestrap';
    import {location} from 'svelte-spa-router';
    import type { Bank } from '../types';
    import { instructorEnabled } from '../stores/instructor';
    
    export let bank: Bank | undefined = undefined;

    let isOpen = false;

    const handleUpdate = (event) => isOpen = event.detail.isOpen
</script>

<Navbar color="primary" dark expand="md">
    <NavbarBrand href="#/">☑️It</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav navbar>
            <BankDropdown {bank} inNav/>
            {#if $instructorEnabled}
                <NavItem>
                    <NavLink href="#/assessment" active={$location=="/assessment"}>Assessment</NavLink>
                </NavItem>
            {/if}
        </Nav>
        <Nav navbar class="ml-auto">
            <form class="form-inline">
                <FormGroup check>
                <Label check class="navbar-text">
                    <Input readonly={false} type="checkbox" bind:checked={$instructorEnabled} />
                    Show instructor options
                </Label>
                </FormGroup>
            </form>
        </Nav>
    </Collapse>
</Navbar>
