import Home from './Home.svelte';
import Bank from './Bank.svelte';
import Outcome from './Outcome.svelte';
import NotFound from './NotFound.svelte';
import Assessment from './Assessment.svelte';

export const routes = {
    '/': Home,
    '/banks/:bankSlug': Bank,
    '/banks/:bankSlug/:outcomeSlug/:exerciseVersion?': Outcome,
    '/assessment/': Assessment,
    '*': NotFound,
}