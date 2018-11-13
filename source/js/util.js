const Marked = window.marked;

// Marked.setOptions({
//   highlight: (code, lang) =>
//     Prism.highlight(code, Prism.languages[lang || "markup"], lang || "markup")
// });

const mdToHTML = content => Marked(content)