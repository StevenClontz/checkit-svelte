<script lang="ts">
    import Nav from './components/Nav.svelte';
    import { onMount } from 'svelte';
    import { banks } from './stores/banks';
    import Router from 'svelte-spa-router';
    import { routes } from './routes';
    import { Spinner } from 'sveltestrap';

    let loading = true;
    onMount(async () => {
        const res = await fetch(`./banks/clontz-diff-eq.json`);
        banks.set([
            await res.json(),
        ])
        loading = false;
    });
</script>


{#if loading}
    <Nav/>
    <div class="text-center">
        <h1 class="display-4">Loading ☑️It...</h1>
        <Spinner color="primary" />
    </div>
{:else}
    <Router {routes}/>
{/if}

<style>
    h1 { margin-top: 1em; }
</style>
