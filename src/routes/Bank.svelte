<script lang="ts">
    import type {Params} from '../types';
    import Nav from '../components/Nav.svelte';
    export let params:Params;
</script>
<Nav {params}/>
<p>{params.bankSlug} <a href="#/">home</a></p>