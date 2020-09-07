<script lang="ts">
    import Pagination from './Pagination.svelte';
    import type { Outcome } from './types';

    export let outcome: Outcome;

    let page = 0;
</script>

<h3>{outcome.slug} - {outcome.title}</h3>

<p>{page}</p>

<Pagination bind:page={page} pages={outcome.exercises.length}/>
