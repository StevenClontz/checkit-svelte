<script lang="ts">
    import {
        Container,
    } from 'sveltestrap';
    import Nav from '../components/Nav.svelte';
    import { assessmentOutcomes } from '../stores/instructor';
</script>

<Nav/>

<main>
    <Container>
        <h1 class="display-4">☑️It Assessment Builder</h1>
        {#if $assessmentOutcomes.length > 0}
            <ul>
                {#each $assessmentOutcomes as outcome}
                    <li>{outcome.title}</li>
                {/each}
            </ul>
        {:else}
            add some outcomes pls 
        {/if}
    </Container>
</main>

<style>
    h1 { margin-top:0.5em }
</style>