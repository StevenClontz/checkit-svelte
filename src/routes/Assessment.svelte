<script lang="ts">
    import {
        Container,
        Row,
        Col,
        Button,
    } from 'sveltestrap';
    import BankDropdown from '../components/dropdowns/Bank.svelte';
    import Exercise from '../components/Exercise.svelte';
    import Sorter from '../components/Sorter.svelte';
    import Nav from '../components/Nav.svelte';
    import { assessmentOutcomeRefs, instructorEnabled } from '../stores/instructor';
    import { banks } from '../stores/banks';
    import { refToOutcome, refsToAssessment } from '../utils';
    import type { OutcomeRef, Assessment } from '../types';

    $instructorEnabled = true
    const display = (ref:OutcomeRef) => {
        let o = refToOutcome(ref,$banks);
        return `${ref.bankSlug}/${ref.outcomeSlug} — ${o.title}`
    };
    let generatedAssessment: Assessment | undefined = undefined
    const generate = () => generatedAssessment = refsToAssessment($assessmentOutcomeRefs,$banks)

    const copyToClipboard = (text:string) => () => {
        navigator.clipboard.writeText(text)
        alert("Copied to clipboard!")
    }
    let latexForm: HTMLFormElement
    const openInOverleaf = () => {
        latexForm.target = "_blank"
        latexForm.action = "https://www.overleaf.com/docs"
        latexForm.method = "POST"
        latexForm.submit()
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
                    {#if $assessmentOutcomeRefs.length < 1}
                        (Add outcomes for your assessment.)
                    {/if}
                    <Sorter bind:array={$assessmentOutcomeRefs} {display} removesItems/>
                    {#if $assessmentOutcomeRefs.length > 0}
                        <a 
                            href="#."
                            on:click|preventDefault={()=>$assessmentOutcomeRefs=[]}>
                            Reset outcomes.
                        </a>
                    {/if}
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>
                    Clicking "Generate" will choose a random exercise assessing
                    each outcome and write a LaTeX file below.
                </p>
                {#if generatedAssessment}
                    <form bind:this={latexForm}>
                        <p>
                            <textarea
                                name="snip"
                                class="form-control text-monospace"
                                rows="4"
                                readonly
                                value={generatedAssessment.tex}
                            />
                        </p>
                    </form>
                    <p class="text-center">
                        <input
                            class="btn btn-success"
                            type="button"
                            value="Open PDF using Overleaf.com"
                            on:click={openInOverleaf}/>
                        <input
                            class="btn btn-info"
                            type="button"
                            value="Copy LaTeX to clipboard 📋"
                            on:click={copyToClipboard(generatedAssessment.tex)}/>
                    </p>
                {/if}
                <p class="text-center">
                    <Button
                        color="primary"
                        disabled={$assessmentOutcomeRefs.length < 1}
                        outline={generatedAssessment !== undefined}
                        on:click={generate}>
                        {#if generatedAssessment}
                            Re-generate
                            {:else}
                            Generate
                        {/if}
                    </Button>
                </p>
                {#if generatedAssessment}
                    <h3>Preview</h3>
                    {#each generatedAssessment.exercises as exercise,i}
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
        color: gray;
        text-align: center;
    }
</style>