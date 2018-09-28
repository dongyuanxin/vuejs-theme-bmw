import "@/assets/css/github-markdown.css";
import "highlight.js/styles/atom-one-light.css";
import hljs from "highlight.js";
import Marked from "marked";
import { cdn } from "@/vendor/setting";

let isMathjaxConfig = false;

const initMathjaxConfig = () => {
  if (!window.MathJax) {
    return;
  }
  window.MathJax.Hub.Config({
    showProcessingMessages: false,
    messageStyle: "none",
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [["$", "$"], ["\\(", "\\)"]],
      displayMath: [["$$", "$$"], ["\\[", "\\]"]],
      skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "a"]
    },
    "HTML-CSS": {
      availableFonts: ["STIX", "TeX"],
      showMathMenu: false
    }
  });
  isMathjaxConfig = true;
};

initMathjaxConfig();

Marked.setOptions({
  highlight: code => hljs.highlightAuto(code).value
});

const replaceImgPath = (str, imgUlr) => {
  if (str === undefined || str === null || typeof str !== "string") {
    return "";
  }
  let re = /!\[.*?\]\((\/.*?)\)/gm,
    replacedStr = "",
    exec = null,
    last = 0;
  while ((exec = re.exec(str)) !== null) {
    replacedStr +=
      str.substring(last, exec.index) +
      exec["0"].replace(exec["1"], imgUlr + exec["1"]);
    last = exec.index + exec["0"].length;
  }
  replacedStr += str.substr(last);
  return replacedStr;
};

function Markdown(imgUrl) {
  this.imgUrl = imgUrl || cdn.mdImgUrl;
}

Markdown.prototype.format = function(str, imgUrl) {
  imgUrl = imgUrl || this.imgUrl;
  return Marked(replaceImgPath(str, imgUrl));
};

Markdown.prototype.mathJax = function(delay) {
  setTimeout(() => {
    if (!window.MathJax) {
      return;
    }

    if (isMathjaxConfig === false) {
      initMathjaxConfig();
    }

    window.MathJax.Hub.Queue([
      "Typeset",
      MathJax.Hub,
      document.getElementById("app")
    ]);
  }, delay === undefined ? 100 : delay);
};

export default Markdown;
