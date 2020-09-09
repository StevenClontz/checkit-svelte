<script lang="ts">
    import katex from 'katex';
    import { afterUpdate } from 'svelte';
    import type { Exercise } from '../types';
    import { instructor } from '../stores/instructor';

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
</script>

<div class="exercise" bind:this={exerciseDiv}>
    {@html parseMath(exercise.html)}
</div>

{#if $instructor.enabled}let's show cool things here{/if}

<style>
    .exercise { overflow-x: scroll; }
</style>