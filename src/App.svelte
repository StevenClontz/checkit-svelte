<script lang="ts">
    import Nav from './components/Nav.svelte';
    import { onMount } from 'svelte';
    import { banks } from './stores/banks';
    import { embedMode } from './stores/embed';
    import Router from 'svelte-spa-router';
    import { routes } from './routes';
    import { Spinner } from 'sveltestrap';
    import CodeCell from './components/CodeCell.svelte';

    let loading = true;
    onMount(async () => {
        if (window['embedMode']) {
            $embedMode = true;
        }
        const diffeq = await fetch(
            `https://stevenclontz.github.io/checkit-clontz-diff-eq/builds/public/clontz-diff-eq-bank.json`
        );
        const la = await fetch(
            `https://teambasedinquirylearning.github.io/checkit-tbil-la/builds/public/tbil-la-bank.json`
        );
        banks.set([
            await diffeq.json(),
            await la.json(),
        ])
        loading = false;
    });

</script>

{#if !$embedMode}
<Nav/>
{/if}
<CodeCell/>
{#if loading}
    <div class="text-center">
        <h1 class="display-4">Loading ☑️It...</h1>
        <Spinner color="primary" />
    </div>
{:else}
    <Router {routes}/>
{/if}
{#if $embedMode}
<p class="text-center"><small><em>Powered by <a target="_blank" href="https://checkit.clontz.org">CheckIt.clontz.org</a>.</em></small></p>
{/if}

<style>
    h1 { margin-top: 1em; }
</style>
