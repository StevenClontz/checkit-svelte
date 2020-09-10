import { writable } from 'svelte/store';
import type { Outcome } from '../types';

export const instructorEnabled = writable(false);
export const assessmentOutcomes = writable(new Array<Outcome>());