<script lang="ts">
    import Pagination from '../components/Pagination.svelte';
    import Exercise from '../components/Exercise.svelte';
    import type { Params } from '../types';
    import { Button, Row, Col } from 'sveltestrap';
    import { banks } from '../stores/banks';
    import { instructorEnabled, assessmentOutcomeRefs } from '../stores/instructor';
    import Bank from './Bank.svelte';
    import { push } from 'svelte-spa-router';
    import { sameRefs } from '../utils';

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
        push(`/banks/${params.bankSlug}/${params.outcomeSlug}/${page+1}`);
    }
    $: countInAssessment = $assessmentOutcomeRefs.filter(r=>sameRefs(r,outcomeRef)).length
    const addToAssessment = () => {
        $assessmentOutcomeRefs = [...$assessmentOutcomeRefs, outcomeRef]
    }
    const removeFromAssessment = () => {
        let i = $assessmentOutcomeRefs
            .map(r=>sameRefs(r,outcomeRef))
            .lastIndexOf(true)
        $assessmentOutcomeRefs = [
            ...$assessmentOutcomeRefs.slice(0, i),
            ...$assessmentOutcomeRefs.slice(i + 1)
        ]
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
    
    <Row>
        <Col xs="auto">
            <Button color="info" outline={!hiddenAnswer} on:click={toggleAnswer}>
                {#if hiddenAnswer}Show{:else}Hide{/if} Answer
            </Button>
        </Col>
        {#if $instructorEnabled }
            <Col xs="auto">
                <span># Included in Assessment:</span>
                <div class="btn-group ml-2" role="group">
                    <Button
                        color="success" 
                        disabled={countInAssessment<1} 
                        on:click={removeFromAssessment}>
                        -
                    </Button>
                    <Button
                        color="success"
                        outline>
                        {countInAssessment}
                    </Button>
                    <Button
                        color="success" 
                        on:click={addToAssessment}>
                        +
                    </Button>
                </div>
            </Col>
        {/if}
    </Row>
    
    <div class="mt-2">
        <Exercise {hiddenAnswer} {exercise}/>
    </div>
</Bank>
