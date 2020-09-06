<script lang="ts">
    import Nav from './Nav.svelte';
    import Jumbotron from './Jumbotron.svelte';
    import { onMount } from 'svelte';
    import { Container } from 'sveltestrap';

	let bank = {
		"title": "Loading...",
		"slug": "loading",
		"outcomes": [],
	};
	onMount(async () => {
		const res = await fetch(`bank.json`);
		bank = await res.json();
	});
</script>

<Nav/>

<Jumbotron/>

<Container>
	<h4>Looking to author your own randomized exercises?</h4>
	
	<p>Check out our <a href="https://github.com/stevenclontz/checkit">README</a> on Github.</p>
	
	<h4>Add this site as an app on your phone</h4>
	
	<p>On <strong>Android/Chrome</strong>: tap the browser menu,
	then tap "Add to Home screen".</p>
	
	<p>On <strong>iOS/Safari</strong>: tap the share arrow,
	then tap "Add to Home Screen".</p>
	
	<h4>Source on GitHub</h4>
	
	<ul>
	  <li><a href="https://github.com/stevenclontz/checkit">CheckIt App</a></li>
	  <li><a href="https://github.com/stevenclontz/checkit.clontz.org">CheckIt Viewer</a></li>
	</ul>
</Container>

<Container>
<h1>{bank.title}</h1>
{#each bank.outcomes as outcome}
<pre>{outcome.name}</pre>
{:else}
<pre>Loading...</pre>
{/each}
</Container>