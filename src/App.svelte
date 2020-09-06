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
      Container,
      Jumbotron,
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

<Jumbotron>
  <Container>
    <h1 class="display-3">☑️It</h1>
    <p class="lead">Free and open randomized exercises for practice and assessment.</p>

    <ul>
      <li>
        <span class="lead">For <strong>students</strong>:</span> Use these exercises to ✔️
        your understanding of your course's learning outcomes.
      </li>
      <li>
        <span class="lead">For <strong>instructors</strong>:</span> Use these exercises in
        assessments to help you ✔️ on student understanding.
      </li>
    </ul>

    <p class="lead">
      <UncontrolledDropdown color="primary">
        <DropdownToggle caret>Select an exercise bank:</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem disabled>Action</DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </p>
  </Container>
</Jumbotron>
<Container>
<h1>{bank.title}</h1>
{#each bank.outcomes as outcome}
<pre>{outcome.name}</pre>
{:else}
<pre>Loading...</pre>
{/each}
</Container>