<script lang="ts">
    import Front from '../components/Front.svelte';
    import Jumbotron from '../components/Jumbotron.svelte';
    import Nav from '../components/Nav.svelte';
    import type {Params} from '../types';
    export let params:Params = {'bankSlug': undefined};
</script>

<Nav {params}/>
<Jumbotron/>
<Front/>