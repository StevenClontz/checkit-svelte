import { writable } from 'svelte/store';
import type { Outcome } from '../types';

export const instructor = writable({
    "enabled": false,
    "outcomes": new Array<Outcome>(),
});