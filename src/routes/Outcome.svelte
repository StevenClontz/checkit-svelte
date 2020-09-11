<script lang="ts">
    import Pagination from '../components/Pagination.svelte';
    import Exercise from '../components/Exercise.svelte';
    import type { Params } from '../types';
    import { Button } from 'sveltestrap';
    import { banks } from '../stores/banks';
    import { instructorEnabled, assessmentOutcomeRefs } from '../stores/instructor';
    import Bank from './Bank.svelte';
    import { push } from 'svelte-spa-router';

    export let params:Params;

    const toggleAnswer = () => hiddenAnswer = !hiddenAnswer;
    const handleKeydown = (e:KeyboardEvent) => {
        if (e.key === " ") {
            toggleAnswer()
        }
    }
    const versionStringToInt = (vs:string|undefined) => parseInt(vs || "1")-1

    $: bank = $banks.find((b)=>b.slug==params.bankSlug);
    $: outcome = bank.outcomes.find((o)=>o.slug==params.outcomeSlug);
    $: outcomeRef = {'bankSlug': bank.slug, 'outcomeSlug': outcome.slug}
    $: version = versionStringToInt(params.exerciseVersion);
    $: exercise = outcome.exercises[version]
    let hiddenAnswer = true; 
    let page = versionStringToInt(params.exerciseVersion);
    let outcomeSlug = params.outcomeSlug;
    $: if (outcomeSlug !== params.outcomeSlug) {
        page = version;
        outcomeSlug = params.outcomeSlug;
    }
    $: if (page !== version) {
        push(`/banks/${params.bankSlug}/${params.outcomeSlug}/${page+1}`)
    }
    $: inAssessment = $assessmentOutcomeRefs.includes(outcomeRef)
    const toggleAssessment = () => {
        if (inAssessment) {
            $assessmentOutcomeRefs = $assessmentOutcomeRefs.filter(
                (ref) => ref!==outcomeRef
            )
        } else {
            $assessmentOutcomeRefs = [...$assessmentOutcomeRefs, outcomeRef]
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}/>

<Bank {params}>
    <div class="d-none d-sm-block">
        <Pagination
            label="Version:" 
            keyboardControl
            bind:page={page}
            pages={outcome.exercises.length}/>
    </div>
    <div class="d-block d-sm-none">
        <Pagination bind:page={page} pages={outcome.exercises.length}/>
    </div>
    
    <p>
        <Button color="info" outline={!hiddenAnswer} on:click={toggleAnswer}>
            {#if hiddenAnswer}Show{:else}Hide{/if} Answer
        </Button>
        {#if $instructorEnabled }
            <Button color={inAssessment ? "success" : "secondary"}
                outline={!inAssessment}
                on:click={toggleAssessment}>
                {#if inAssessment}
                    Included in assessment.
                {:else}
                    Not included in assessment.
                {/if}
            </Button>
        {/if}
    </p>
    
    <Exercise {hiddenAnswer} {exercise}/>
</Bank>
