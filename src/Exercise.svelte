<script lang="ts">
    import katex from 'katex';
    import { onMount } from 'svelte';

    export let html: string;
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
    const decorateAnswer = () => {
        for (let e of document.getElementsByClassName("exercise-answer")) {
            e.classList.add("alert");
            e.classList.add("alert-info");
            if (hiddenAnswer) {
                e.classList.add("d-none");
            }
        }
    }
    onMount(decorateAnswer);
</script>

{@html parseMath(html)}