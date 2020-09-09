<script lang="ts">
    import {
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from 'sveltestrap';
    import type { Bank, Outcome } from '../types';
    import { banks } from '../banks';

    export let bank: Bank;
    export let outcome: Outcome | undefined = undefined;
</script>

<UncontrolledDropdown>
    <DropdownToggle caret>
        {#if outcome}
            {outcome.title}
        {:else}
            Select a learning outcome:
        {/if}
    </DropdownToggle>
    <DropdownMenu>
        {#each $banks as b}
            {#if b !== bank}
                <DropdownItem href="#/banks/{b.slug}">{b.title}</DropdownItem>
            {/if}
        {/each}
        {#if bank}
            {#if $banks.length > 1}
                <DropdownItem divider/>
            {/if}
            <DropdownItem href="#/">Back to Home</DropdownItem>
        {/if}
    </DropdownMenu>
</UncontrolledDropdown>