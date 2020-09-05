<script lang="ts">
	import { onMount } from 'svelte';

    import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink,
      UncontrolledDropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
      Container
    } from 'sveltestrap';
  
    let navIsOpen = false;
  
    function handleUpdate(event) {
      navIsOpen = event.detail.isOpen;
	}

	let bank = {
		"title": "Loading...",
		"slug": "loading",
		"outcomes": [],
	};
	onMount(async () => {
		const res = await fetch(`bank.json`);
		bank = await res.json();
	});
</script>

<Navbar color="primary" dark expand="md">
  <NavbarBrand href="/">☑️It</NavbarBrand>
  <NavbarToggler on:click={() => (navIsOpen = !navIsOpen)} />
  <Collapse {navIsOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav navbar>
      <NavItem>
        <NavLink href="#">Bank 1</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Bank 2</NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>Options</DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  </Collapse>
</Navbar>

<Container>
<h1>{bank.title}</h1>
{#each bank.outcomes as outcome}
<pre>{outcome.name}</pre>
{:else}
<pre>Loading...</pre>
{/each}
</Container>
