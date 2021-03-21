<script lang="ts">
    import Nav from './components/Nav.svelte';
    import { onMount } from 'svelte';
    import { banks } from './stores/banks';
    import Router from 'svelte-spa-router';
    import { routes } from './routes';
    import { Spinner } from 'sveltestrap';

    let loading = true;
    onMount(async () => {
        const diffeq = await fetch(
            `https://stevenclontz.github.io/checkit-clontz-diff-eq/builds/public/clontz-diff-eq-bank.json`
        );
        const la = await fetch(
            `https://teambasedinquirylearning.github.io/checkit-tbil-la/builds/public/tbil-la-bank.json`
        );
        const aa = await fetch(
            `https://stevenclontz.github.io/checkit-clontz-abs-alg/builds/public/clontz-abs-alg-bank.json`
        );
        banks.set([
            await diffeq.json(),
            await la.json(),
            await aa.json(),
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
