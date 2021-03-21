<script lang="ts">
    import BankDropdown from './dropdowns/Bank.svelte';
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
    
    let codeCellOpen = false;
    const codeCellToggle = () => (codeCellOpen = !codeCellOpen);
</script>

<Navbar color="primary" dark expand="md">
    <NavbarBrand href="#/">☑️It</NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
        <Nav navbar>
            <BankDropdown {bank} inNav/>
            <NavItem>
                <NavLink on:click={codeCellToggle}>
                    Code Cell
                </NavLink>
            </NavItem>
            {#if $instructorEnabled}
                <NavItem>
                    <NavLink href="#/assessment" active={$location=="/assessment"}>
                        Assessment Builder
                    </NavLink>
                </NavItem>
            {/if}
        </Nav>
        <Nav navbar class="ml-auto">
            <NavItem>
                <form class="form-inline">
                    <FormGroup check>
                    <Label check class="navbar-text">
                        <Input size="" readonly={false} type="checkbox" bind:checked={$instructorEnabled} />
                        Show instructor options
                    </Label>
                    </FormGroup>
                </form>
            </NavItem>
        </Nav>
    </Collapse>
</Navbar>
<div style="display: {codeCellOpen ? 'block' : 'none'}">
    <iframe title="codecell" style="width:100%;height:400px;" src="codecell/"/>
</div>
