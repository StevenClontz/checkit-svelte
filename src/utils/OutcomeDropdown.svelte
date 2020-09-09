<script lang="ts">
    import {
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from 'sveltestrap';
    import type { Bank, Outcome } from '../types';

    export let bank: Bank;
    export let outcome: Outcome | undefined = undefined;
</script>

<UncontrolledDropdown>
    <DropdownToggle caret>
        {#if outcome}
            {outcome.slug} &mdash; {outcome.title}
        {:else}
            Select a learning outcome:
        {/if}
    </DropdownToggle>
    <DropdownMenu>
        {#each bank.outcomes as o}
            <DropdownItem disabled={o===outcome} href="#/banks/{bank.slug}/{o.slug}">
                {#if o===outcome}»{/if} {o.slug} &mdash; {o.title}
            </DropdownItem>
        {/each}
    </DropdownMenu>
</UncontrolledDropdown>