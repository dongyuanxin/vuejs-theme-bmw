<template>
  <div class="container">
    <passage-browser :passages="passages"></passage-browser>
    <nav class="page-navigation">
      <router-link to="/blog/2">下一页</router-link>
    </nav>
  </div>
</template>

<script>
import "@/assets/css/article.scss";

import PassageBrowser from "@/components/passage/PassageBrowser";

import Markdown from "@/vendor/markdown.js";
import Passage from "@/vendor/passage.js";

const mdAPI = new Markdown();
const psgAPI = new Passage();

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      passages: []
    };
  },
  components: {
    PassageBrowser
  },
  mounted() {
    this.fetchPassages();
  },
  methods: {
    fetchPassages() {
      psgAPI.fetch(this.page, this.limit, true).then(res => {
        this.passages = res;
        mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
      });
    }
  }
};
</script>
