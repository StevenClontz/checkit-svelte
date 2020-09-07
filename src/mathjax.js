import mjAPI from 'mathjax-node';
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mjAPI.start();

export let parseMath = (source) => {
  mjAPI.typeset({
    math: source,
    format: "inline-TeX", // or "inline-TeX", "MathML"
    svg:true,      // or svg:true, or html:true
  }, function (data) {
    if (!data.errors) {console.log(data.mml)}
  });
}
