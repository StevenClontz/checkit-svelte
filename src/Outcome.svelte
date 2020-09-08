<script lang="ts">
    import Pagination from './Pagination.svelte';
    import type { Outcome, Exercise } from './types';
    import katex from 'katex';

    export let outcome: Outcome;

    let version = 0;

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
    };
    const preview = (e:Exercise) => {
        return parseMath(e.html)
    }
</script>

<h3>{outcome.slug} - {outcome.title}</h3>

<div>
    Version:
    <Pagination bind:page={version} pages={outcome.exercises.length}/>
</div>

{@html preview(outcome.exercises[version])}