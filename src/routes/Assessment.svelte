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
    import { refToOutcome, sample } from '../utils';
    import type { OutcomeRef } from '../types';

    $instructorEnabled = true
    const display = (ref:OutcomeRef) => {
        let o = refToOutcome(ref,$banks);
        return `${ref.bankSlug}/${ref.outcomeSlug} — ${o.title}`
    };
    let generatedAssessment = "";
    let generatedExercises = [];
    const assessmentPrefix = `
\\documentclass[11pt]{exam}
\\usepackage{amsfonts,amssymb,amsmath, amsthm}
\\usepackage{enumerate}
\\pagestyle{headandfoot}
\\firstpageheader{\\assessmentTitle \\hspace{2.5em} \\today}{}{Name: \\underline{\\hspace{2.5in}}}
%\\firstpageheadrule
\\runningheader{\\assessmentTitle}{}{Page \\thepage\\ of \\numpages}
\\runningheadrule
\\firstpagefooter{}{}{}
\\runningfooter{}{}{}
\\newenvironment{exerciseStatement}{\\question}{}
\\newenvironment{exerciseAnswer}{\\begin{solution}}{\\end{solution}\\vfill}




%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                          Edit settings                         %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\newcommand{\\assessmentTitle}{
CheckIt Assessment
}
\\newcommand{\\assessmentInstructions}{
Do not use any unapproved aids while taking this assessment.
Read each question carefully and be sure to show all work
in the space provided.
}
%\\printanswers % uncomment to show answers

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



\\begin{document}

\\begin{center}
\\fbox{\\fbox{\\parbox{6in}{\\centering\\assessmentInstructions}}}
\\end{center}

\\begin{questions}

`
    const assessmentSuffix = `

\\end{questions}

\\end{document}
`
    const generate = () => {
        generatedAssessment = assessmentPrefix;
        generatedExercises = [];
        $assessmentOutcomeRefs.forEach( (ref,i) => {
            let o = refToOutcome(ref,$banks);
            let e = sample(o.exercises);
            generatedAssessment = generatedAssessment + "\n\n" + e.tex;
            if (i%2===1) {
                generatedAssessment = generatedAssessment + "\n\n\\newpage\n\n";
            }
            generatedExercises = [...generatedExercises, e];
        })
        generatedAssessment = generatedAssessment + assessmentSuffix;
        generatedAssessment = generatedAssessment.trim()
    }
    const copyToClipboard = (text:string) => {
        navigator.clipboard.writeText(text)
        alert("Copied to clipboard!")
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
                {#if generatedExercises.length > 0}
                    <form action="https://www.overleaf.com/docs" method="post" target="_blank">
                        <p>
                            <textarea
                                name="snip"
                                class="form-control text-monospace"
                                rows="4"
                                readonly
                                value={generatedAssessment}
                            />
                        </p>
                        <p class="text-center">
                            <input
                                class="btn btn-success"
                                type="submit"
                                value="Open PDF using Overleaf.com"/>
                            <input
                                class="btn btn-info"
                                type="button"
                                value="Copy LaTeX to clipboard 📋"
                                on:click={()=>copyToClipboard(generatedAssessment)}
                                />
                        </p>
                    </form>
                {/if}
                <p class="text-center">
                    <Button
                        color="primary"
                        disabled={$assessmentOutcomeRefs.length < 1}
                        outline={generatedExercises.length > 0}
                        on:click={generate}>
                        {#if generatedExercises.length < 1}
                            Generate
                        {:else}
                            Re-generate
                        {/if}
                    </Button>
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
        color: gray;
        text-align: center;
    }
</style>