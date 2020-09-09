export type Bank = {
    title: string
    slug: string
    outcomes: Array<Outcome>
}
export type Outcome = {
    title: string
    slug: string
    exercises: Array<Exercise>
}
export type Exercise = {
    seed: number
    qti: string
    ptx: string
    latex: string 
    html: string
}
export type Params = {
    bankSlug: string
    outcomeSlug: string
}