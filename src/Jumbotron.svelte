<script lang="ts">
    import {
      Container,
      Jumbotron,
      UncontrolledDropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
    } from 'sveltestrap';
</script>

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