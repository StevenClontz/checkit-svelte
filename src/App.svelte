<script lang="ts">
    import Nav from './components/Nav.svelte';
    import { onMount } from 'svelte';
    import { banks } from './banks';
    import Router from 'svelte-spa-router';
    import HomeRoute from './routes/Home.svelte';
    import BankRoute from './routes/Bank.svelte';
    import NotFound from './routes/NotFound.svelte';

    const routes = {
        '/': HomeRoute,
        '/banks/:bankSlug': BankRoute,
        '*': NotFound,
    }

    let loading = true;
    onMount(async () => {
        const res = await fetch(`./bank.json`);
        let _0 = await res.json();
        let _1 = {..._0};
        let _2 = {..._0};
        _1.title = "Foobar";
        _1.slug = "foo";
        _1.outcomes = _1.outcomes.slice(2,7);
        _2.title = "Hello Baz";
        _2.slug = "baz";
        _2.outcomes = _2.outcomes.slice(3,8);
        banks.set([_0,_1,_2])
        loading = false;
    });
</script>


{#if loading}
    <Nav/>
    <div class="text-center">
        <h1 class="display-4">Loading ☑️It...</h1>
    </div>
{:else}
    <Router {routes}/>
{/if}

<style>
    h1 { margin-top: 1em; }
</style>
