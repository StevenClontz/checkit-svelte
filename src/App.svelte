<script lang="ts">
    import BankComponent from './Bank.svelte';
    import Jumbotron from './Jumbotron.svelte';
    import Front from './Front.svelte';
    import Nav from './Nav.svelte';
    import { onMount } from 'svelte';
    import type { Bank } from './types';
    import { banks } from './banks';

    let bank: Bank | undefined = undefined;
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
        banks.push(_0,_1,_2)
        loading = false;
    });
</script>

<Nav bind:bank={bank}/>

{#if loading}
    <div class="text-center">
        <h1 class="display-4">Loading ☑️It...</h1>
    </div>
{:else}
    {#if bank}
        <div class="bank">
            <BankComponent bind:bank={bank}/>
        </div>
    {:else}
        <Jumbotron bind:bank={bank}/>
        <Front/>
    {/if}
{/if}

<style>
    h1 { margin-top: 1em; }
</style>
