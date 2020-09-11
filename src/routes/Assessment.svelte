<script lang="ts">
    import {
        Container,
        Row,
        Col,
        Button,
    } from 'sveltestrap';
    import BankDropdown from '../components/dropdowns/Bank.svelte';
    import Exercise from '../components/Exercise.svelte';
    import DragDropList from 'svelte-dragdroplist';
    import Nav from '../components/Nav.svelte';
    import { assessmentOutcomeRefs } from '../stores/instructor';
    import { banks } from '../stores/banks';
    import { refToOutcome, sample } from '../utils';

    let ddList = $assessmentOutcomeRefs.map((ref)=>{
        let o = refToOutcome(ref,$banks);
        return {
            'text': ref.bankSlug + "/" + ref.outcomeSlug + " — " + o.title,
            'outcomeRef': ref
        }
    });
    $: $assessmentOutcomeRefs = ddList.map((l)=>l.outcomeRef);
    let generatedAssessment = "";
    let generatedExercises = [];
    const generate = () => {
        generatedAssessment = "";
        generatedExercises = [];
        for (let ref of $assessmentOutcomeRefs) {
            let o = refToOutcome(ref,$banks);
            let e = sample(o.exercises);
            generatedAssessment = generatedAssessment + "\n\n" + e.tex;
            generatedExercises = [...generatedExercises, e];
        }
        generatedAssessment = generatedAssessment.trim()
    }
</script>

<Nav/>

<main>
    <Container>
        <h1 class="display-4">☑️It Assessment Builder</h1>
        <Row>
            <Col sm="4">
                <p>
                    Build your assessment by first adding learning outcomes 
                    from exercise banks:
                </p>
                <p><BankDropdown/></p>
                <p>
                    Then you can sort these outcomes into whatever order 
                    you wish. 
                </p>
            </Col>
            <Col sm="8">
                <div class="outcome-ordering">
                    <DragDropList bind:data={ddList} removesItems/>
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>
                    Clicking "Generate" will choose a random exercise assessing
                    each outcome and write a LaTeX file below.
                </p>
                <p class="text-center">
                    <Button color="success" on:click={generate}>Generate</Button>
                </p>
                <p>
                    <textarea class="form-control" rows="4" readonly value={generatedAssessment} />
                </p>
                {#if generatedExercises.length > 0}
                    <h3>Preview</h3>
                    {#each generatedExercises as exercise,i}
                        <h4>Exercise {i+1}</h4>
                        <Exercise {exercise} statementOnly/>
                    {/each}
                {/if}
            </Col>
        </Row>
    </Container>
</main>

<style>
    h1 { margin-top:0.5em }
    .outcome-ordering {
        border: 1px #888 solid; 
        border-radius: 5px; 
        padding: 10px; 
        margin-bottom: 1em;
    }
</style>