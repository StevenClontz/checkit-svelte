<script lang="ts">
    import Pagination from './Pagination.svelte';
    import Exercise from './Exercise.svelte';
    import type { Outcome } from './types';
    import { Button } from 'sveltestrap';

    export let outcome: Outcome;

    let version = 0;
    let hiddenAnswer = true;

    const toggleAnswer = () => hiddenAnswer = !hiddenAnswer;

    const handleKeydown = (e:KeyboardEvent) => {
        if (e.key === " ") {
            toggleAnswer()
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="d-none d-sm-block">
    <Pagination label="Version:" bind:page={version} pages={outcome.exercises.length}/>
</div>
<div class="d-block d-sm-none">
    <Pagination bind:page={version} pages={outcome.exercises.length}/>
</div>

<Button color="info" on:click={toggleAnswer}>
    {#if hiddenAnswer}Show{:else}Hide{/if} Answer
</Button>

<hr/>

<Exercise {hiddenAnswer} html={outcome.exercises[version].html}/>