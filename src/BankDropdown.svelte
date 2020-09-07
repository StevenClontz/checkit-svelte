<script lang="ts">
    import {
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,
        DropdownItem,
    } from 'sveltestrap';
    import type {Bank} from './types';

    export let bank: Bank | undefined;
    export let banks: Array<Bank>;
    export let inNav: boolean;

	const setBank = (b:Bank) => () => bank=b;
	const unsetBank = () => bank=undefined;
</script>

<UncontrolledDropdown nav={inNav} inNavbar={inNav}>
    <DropdownToggle nav={inNav} caret>
        {#if bank}
            {bank.title}
        {:else}
            Select an exercise bank:
        {/if}
    </DropdownToggle>
    <DropdownMenu>
        {#each banks as b}
            <DropdownItem on:click={setBank(b)}>{b.title}</DropdownItem>
        {/each}
        {#if bank}
            {#if banks}
                <DropdownItem divider/>
            {/if}
            <DropdownItem on:click={unsetBank}>Back to Home</DropdownItem>
        {/if}
    </DropdownMenu>
</UncontrolledDropdown>