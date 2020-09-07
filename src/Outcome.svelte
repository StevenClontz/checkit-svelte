<script lang="ts">
    import Pagination from './Pagination.svelte';
    import type { Outcome } from './types';
    import { parseMath } from './mathjax.js';

    export let outcome: Outcome;

    let version = 0;
</script>

<h3>{outcome.slug} - {outcome.title}</h3>

<div>
    Version:
    <Pagination bind:page={version} pages={outcome.exercises.length}/>
</div>

<!--{@html parseMath(outcome.exercises[version].html)}-->
{@html outcome.exercises[version].html}