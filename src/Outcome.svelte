<script lang="ts">
    import Pagination from './Pagination.svelte';
    import Exercise from './Exercise.svelte';
    import type { Outcome } from './types';
    import { Button } from 'sveltestrap';

    export let outcome: Outcome;

    let version = 0;
    let hiddenAnswer = true;
</script>

<div>
    <Pagination label="Version:" bind:page={version} pages={outcome.exercises.length}/>
</div>

<Button color="info" on:click={() => hiddenAnswer = !hiddenAnswer}>
    {#if hiddenAnswer}Show{:else}Hide{/if} Answer
</Button>

<hr/>

<Exercise {hiddenAnswer} html={outcome.exercises[version].html}/>