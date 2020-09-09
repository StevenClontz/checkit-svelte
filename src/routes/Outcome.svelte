<script lang="ts">
    import Pagination from '../components/Pagination.svelte';
    import Exercise from '../components/Exercise.svelte';
    import type { Params } from '../types';
    import { Button } from 'sveltestrap';
    import { banks } from '../stores/banks';
    import Bank from './Bank.svelte';
    import { push } from 'svelte-spa-router';

    export let params:Params;

    const toggleAnswer = () => hiddenAnswer = !hiddenAnswer;

    const handleKeydown = (e:KeyboardEvent) => {
        if (e.key === " ") {
            toggleAnswer()
        }
    }

    let bank = $banks.find((b)=>b.slug==params.bankSlug);
    let outcome = bank.outcomes.find((o)=>o.slug==params.outcomeSlug);
    
    let versionString = (params.versionSlug ? params.versionSlug : "1")
    let oldVersion = Math.max(0,Math.min(outcome.exercises.length,parseInt(versionString))-1);
    let version = oldVersion;
    $: if (version !== oldVersion) {
        push(`/banks/${bank.slug}/${outcome.slug}/${version+1}`);
    }
    let hiddenAnswer = true; 
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
