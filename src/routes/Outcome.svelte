<script lang="ts">
    import Pagination from '../components/Pagination.svelte';
    import Exercise from '../components/Exercise.svelte';
    import type { Params } from '../types';
    import { Button } from 'sveltestrap';
    import { banks } from '../stores/banks';
    import Bank from './Bank.svelte';


    export let params:Params;

    let version = 0;
    let hiddenAnswer = true;

    const toggleAnswer = () => hiddenAnswer = !hiddenAnswer;

    const handleKeydown = (e:KeyboardEvent) => {
        if (e.key === " ") {
            toggleAnswer()
        }
    }

    $: bank = $banks.find((b)=>b.slug==params.bankSlug);
    $: outcome = bank.outcomes.find((o)=>o.slug==params.outcomeSlug); 
</script>

<svelte:window on:keydown={handleKeydown}/>

<Bank {params}>
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
</Bank>
