import { writable } from 'svelte/store';
import type { OutcomeRef } from '../types';

let _ie = false;
if (localStorage.getItem('instructorEnabled')) {
    try {
        let _ietry = JSON.parse(localStorage.getItem('instructorEnabled'));
        if (typeof _ietry == 'boolean') { _ie = _ietry }
    } catch {}
}
export const instructorEnabled = writable(_ie);
instructorEnabled.subscribe(value => {
    localStorage.setItem("instructorEnabled", JSON.stringify(value));
});

let _ao: Array<OutcomeRef> = [];
if (localStorage.getItem('assessmentOutcomeRefs')) {
    try {
        let _aotry = JSON.parse(localStorage.getItem('assessmentOutcomeRefs'));
        if (Array.isArray(_aotry)) { _ao = _aotry }
    } catch {}
}
export const assessmentOutcomeRefs = writable(_ao);
assessmentOutcomeRefs.subscribe(value => {
    localStorage.setItem("assessmentOutcomeRefs", JSON.stringify(value));
});