import type {Bank, OutcomeRef, Assessment} from '../types';

export const refToBank = (ref:OutcomeRef,banks:Bank[]) => 
    banks.find((b)=>b.slug===ref.bankSlug)

export const refToOutcome = (ref:OutcomeRef,banks:Bank[]) =>
    refToBank(ref,banks).outcomes.find((o)=>o.slug===ref.outcomeSlug)

export const sample = (a:Array<any>) => a[Math.floor(Math.random()*a.length)]

export const sameRefs = (o0:OutcomeRef,o1:OutcomeRef) => {
    return o0.bankSlug==o1.bankSlug && o0.outcomeSlug==o1.outcomeSlug
}

export const refsToAssessment = (refs:OutcomeRef[],banks:Bank[]) => {
    const assessmentPrefix = `
\\documentclass[11pt]{exam}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                        Edit settings                        %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\newcommand{\\assessmentTitle}{
CheckIt Assessment
}
\\newcommand{\\assessmentVersion}{
Version ${Date.now()}
}
\\newcommand{\\assessmentInstructions}{
Do not use any unapproved aids while taking this assessment.
Read each question carefully and be sure to show all work
in the space provided.
}
%\\printanswers % uncomment to show answers

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



\\usepackage{amsfonts,amssymb,amsmath,amsthm}
\\usepackage{enumerate}
\\pagestyle{headandfoot}
\\firstpageheader{\\assessmentTitle \\hspace{2em} \\assessmentVersion}{}{Name: \\underline{\\hspace{2.5in}}}
\\runningheader{\\assessmentTitle}{}{Page \\thepage\\ of \\numpages}
\\runningheadrule
\\firstpagefooter{}{}{}
\\runningfooter{}{}{}
\\newenvironment{exerciseStatement}{\\question}{}
\\newenvironment{exerciseAnswer}{\\begin{solution}}{\\end{solution}\\vfill}

\\begin{document}

\\begin{center}
\\fbox{\\fbox{\\parbox{6in}{\\centering\\assessmentInstructions}}}
\\end{center}

\\begin{questions}

`
    const assessmentSuffix = `

\\end{questions}

\\end{document}
`
        let assessment: Assessment = {
            "tex": "",
            "exercises": [],
        }
        assessment.tex = assessmentPrefix
        refs.forEach( (ref,i) => {
            let o = refToOutcome(ref,banks)
            let e = sample(o.exercises)
            assessment.tex = assessment.tex + "\n\n" + e.tex
            if (i%2===1) {
                assessment.tex = assessment.tex + "\n\n\\newpage\n\n"
            }
            assessment.exercises = [...assessment.exercises, e]
        })
        assessment.tex = assessment.tex + assessmentSuffix
        assessment.tex = assessment.tex.trim()
        return assessment
    }