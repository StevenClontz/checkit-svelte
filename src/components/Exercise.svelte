<script lang="ts">
    import katex from 'katex';
    import { afterUpdate } from 'svelte';
    import type { Exercise, Bank, Outcome } from '../types';
    import { instructorEnabled } from '../stores/instructor';
    import { embedMode } from '../stores/embed';
    import { Nav, NavItem, NavLink, Row, Col } from 'sveltestrap';

    export let bank: Bank = 
        {title: 'unknown', slug: 'unknown', outcomes: []};
    export let outcome: Outcome = 
        {title: 'unknown', slug: 'unknown', exercises: [], description: 'unknown', alignment: 'unknown'};
    export let exercise: Exercise;
    export let page = 1;
    export let hiddenAnswer: boolean=true;
    export let statementOnly: boolean=false;

    let inlineMathRe = /\\\((.*?)\\\)/gs;
    let displayMathRe = /\\\[(.*?)\\\]/gs;
    const parseMath = (html:string) => {
        return html.replace(
            inlineMathRe,
            (_, tex:string) => katex.renderToString(tex.replace(/&amp;/g,'&'), {
                'displayMode': false,
                'throwOnError': false,
            })
        ).replace(
            displayMathRe,
            (_, tex:string) => katex.renderToString(tex.replace(/&amp;/g,'&'), {
                'displayMode': true,
                'throwOnError': false,
            })
        );
    }

    let exerciseDiv: Element;
    const decorateAnswer = () => {
        if (exerciseDiv) {
            for (let e of exerciseDiv.getElementsByClassName("exercise-answer")) {
                e.classList.add("alert");
                e.classList.add("alert-info");
                if (hiddenAnswer || statementOnly) {
                    e.classList.add("d-none");
                } else {
                    e.classList.remove("d-none");
                }
            }
        }
    }
    afterUpdate(decorateAnswer);

    const modes = ['display', 'html', 'embed', 'tex', 'pretext']
    const modeLabels = ['Display', 'HTML', 'Embed (HTML)', 'LaTeX', 'PreTeXt']
    let mode = "display";
    const changeMode = (m:string) => (e:Event) => {
        e.preventDefault();
        mode = m;
    }
</script>

{#if !statementOnly && !$embedMode}
    {#if $instructorEnabled}
        <div class="navtabs">
            <Nav tabs>
                {#each modes as m,i}
                    <NavItem>
                        <NavLink 
                            active={mode==m} 
                            on:click={changeMode(m)} 
                            href="#/">
                            {modeLabels[i]}
                        </NavLink>
                    </NavItem>
                {/each}
            </Nav>
        </div>
    {:else}
        <hr/>
    {/if}
{/if}

{#if $embedMode }
    <div bind:this={exerciseDiv}>{@html parseMath(exercise.html)}</div>
{:else}
<Row>
    <Col sm={{ size: 10, offset: 1 }}>
        {#if mode == "display"}
            <div bind:this={exerciseDiv}>{@html parseMath(exercise.html)}</div>
        {:else if mode == "html"}
            <pre class="pre-scrollable"><code>{exercise.html}</code></pre>
        {:else if mode == "tex"}
            <pre class="pre-scrollable"><code>{exercise.tex}</code></pre>
        {:else if mode == "pretext"}
            <pre class="pre-scrollable"><code>{exercise.pretext}</code></pre>
        {:else if mode == "embed"}
            <pre class="pre-scrollable"><code>&lt;iframe title="Iframe CheckIt Outcome"
    width="800"
    height="450"
    src="https://checkit.clontz.org/embed/#/banks/{bank.slug}/{outcome.slug}/{page+1}/"&gt;
&lt;/iframe&gt;</code></pre>
        {:else}
            Invalid mode.
        {/if}
    </Col>
</Row>
{/if}

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