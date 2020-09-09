<script lang="ts">
    import BankDropdown from '../utils/BankDropdown.svelte';
    import {
        Navbar,
        NavbarBrand,
        Nav,
        Input,
        FormGroup,
        Label,
        Collapse,
        NavbarToggler,
    } from 'sveltestrap';
    import type { Bank } from '../types';
    import { instructor } from '../stores/instructor';
    
    export let bank: Bank | undefined = undefined;

    let isOpen = false;

    const handleUpdate = (event) => isOpen = event.detail.isOpen
</script>

<Navbar color="primary" dark expand="md">
    <NavbarBrand href="#/">☑️It</NavbarBrand>
    {#if bank}
        <NavbarToggler on:click={() => (isOpen = !isOpen)} />
        <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
            <Nav navbar>
                <BankDropdown {bank} inNav/>
            </Nav>
            <Nav navbar class="ml-auto">
                <form class="form-inline">
                    <FormGroup check>
                    <Label check class="navbar-text">
                        <Input type="checkbox" bind:checked={$instructor.enabled} />
                        Show instructor options
                    </Label>
                    </FormGroup>
                </form>
            </Nav>
        </Collapse>
    {/if}
</Navbar>
