<script lang="ts">
    import {
        Container,
        Jumbotron,
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from 'sveltestrap';
    import type { Bank } from './types';

    export let banks: Array<Bank> = [];
    export let bank: Bank | undefined;
    
	const setBank = (b:Bank) => () => bank=b;
	const unsetBank = () => bank=undefined;
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
                    {#each banks as b}
                        <DropdownItem on:click={setBank(b)}>{b.title}</DropdownItem>
                    {:else}
                        <DropdownItem disabled>No banks found.</DropdownItem>
                    {/each}
                    <DropdownItem divider/>
                    <DropdownItem on:click={unsetBank}>Back to Home</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </p>
    </Container>
</Jumbotron>