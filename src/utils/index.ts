import type {Bank, OutcomeRef} from '../types';

export const refToBank = (ref:OutcomeRef,banks:Bank[]) => 
    banks.find((b)=>b.slug===ref.bankSlug)
export const refToOutcome = (ref:OutcomeRef,banks:Bank[]) =>
    refToBank(ref,banks).outcomes.find((o)=>o.slug===ref.outcomeSlug)

export const sample = (a:Array<any>) => a[Math.floor(Math.random()*a.length)]

export const sameRefs = (o0:OutcomeRef,o1:OutcomeRef) => {
    return o0.bankSlug==o1.bankSlug && o0.outcomeSlug==o1.outcomeSlug
}