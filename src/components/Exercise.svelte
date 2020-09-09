<script lang="ts">
    import katex from 'katex';
    import { afterUpdate } from 'svelte';
    import type { Exercise } from '../types';
    import { instructor } from '../stores/instructor';
    import { Nav, NavItem, NavLink, Row, Col } from 'sveltestrap';

    export let exercise: Exercise;
    export let hiddenAnswer: boolean;

    let inlineMathRe = /\\\((.*?)\\\)/gs;
    let displayMathRe = /\\\[(.*?)\\\]/gs;
    const parseMath = (html:string) => {
        return html.replace(
            inlineMathRe,
            (_, tex:string) => katex.renderToString(tex, {
                'displayMode': false,
                'throwOnError': false,
            })
        ).replace(
            displayMathRe,
            (_, tex:string) => katex.renderToString(tex, {
                'displayMode': true,
                'throwOnError': false,
            })
        );
    }

    let exerciseDiv: Element;
    const decorateAnswer = () => {
        for (let e of exerciseDiv.getElementsByClassName("exercise-answer")) {
            e.classList.add("alert");
            e.classList.add("alert-info");
            if (hiddenAnswer) {
                e.classList.add("d-none");
            } else {
                e.classList.remove("d-none");
            }
        }
    }
    afterUpdate(decorateAnswer);

    const modes = ['display', 'html', 'tex', 'pretext']
    const modeLabels = ['Display', 'HTML source', 'LaTeX source', 'PreTeXt source']
    let mode = "display";
    const changeMode = (m:string) => (e:Event) => {
        e.preventDefault();
        mode = m;
    }
</script>

{#if $instructor.enabled}
    <div class="navtabs">
        <Nav tabs>
            {#each modes as m,i}
                <NavItem>
                    <NavLink active={mode==m} on:click={changeMode(m)} href="#/">{modeLabels[i]}</NavLink>
                </NavItem>
            {/each}
        </Nav>
    </div>
{:else}
    <hr/>
{/if}

<div class="exercise" bind:this={exerciseDiv}>
    <Row>
        {#if mode == "display"}
            <Col>{@html parseMath(exercise.html)}</Col>
        {:else if mode == "html"}
            <Col sm={{ size: 10, offset: 1 }}><pre class="pre-scrollable"><code>{exercise.html}</code></pre></Col>
        {:else if mode == "tex"}
            <Col sm={{ size: 10, offset: 1 }}><pre class="pre-scrollable"><code>{exercise.tex}</code></pre></Col>
        {:else if mode == "pretext"}
            <Col sm={{ size: 10, offset: 1 }}><pre class="pre-scrollable"><code>{exercise.pretext}</code></pre></Col>
        {:else}
            Invalid mode.
        {/if}
    </Row>
</div>

<style>
    pre {
        border: 1px #ddd solid;
        background-color: #eee;
        padding: 4px;
        border-radius: 5px;
    }
    .navtabs {
        margin-bottom: 1em;
    }
</style>