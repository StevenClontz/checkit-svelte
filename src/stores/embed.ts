import { writable } from 'svelte/store';

let _embedMode: Boolean = false;
export const embedMode = writable(_embedMode);