<script lang="ts">
    import Pagination from './Pagination.svelte';
    import type { Outcome, Exercise } from './types';
    //import katex from 'katex';

    export let outcome: Outcome;

    let version = 0;

    let inlineMathRe = /\\\((.*)\\\)/;
    let displayMathRe = /\\\[(.*)\\\]/;
    const parseMath = (html:string) => {
        //html = html.replace(inlineMathRe, katex.renderToString);
        //return html.replace(displayMathRe, katex.renderToString);
        return html
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