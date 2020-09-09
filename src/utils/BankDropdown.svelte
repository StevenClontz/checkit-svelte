<script lang="ts">
    import {
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from 'sveltestrap';
    import { banks } from '../banks';
    import type {Params} from '../types';

    export let inNav: boolean=false;
    let params:Params = {'bankSlug': undefined};
</script>

<UncontrolledDropdown nav={inNav} inNavbar={inNav}>
    <DropdownToggle nav={inNav} caret>
        {#if params.bankSlug}
            TODO current bank title
        {:else}
            Select an exercise bank:
        {/if}
    </DropdownToggle>
    <DropdownMenu>
        {#each $banks as b}
            <DropdownItem href="#/banks/{b.slug}">{b.title}</DropdownItem>
        {/each}
        {#if params.bankSlug}
            {#if banks}
                <DropdownItem divider/>
            {/if}
            <DropdownItem href="#/">Back to Home</DropdownItem>
        {/if}
    </DropdownMenu>
</UncontrolledDropdown>