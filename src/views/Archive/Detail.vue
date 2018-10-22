<template>
  <div class="container">
    <passage-browser :passages="passages"></passage-browser>
  </div>
</template>

<script>
import "@/assets/css/article.scss";

import Markdown from "@/vendor/markdown.js";
import PassageBrowser from "@/components/passage/PassageBrowser";
import Passage from "@/vendor/passage.js";

const mdAPI = new Markdown();
const psgAPI = new Passage();

export default {
  data() {
    return {
      time: "",
      passages: []
    };
  },
  mounted() {
    this.time = this.$route.params.time;
    this.fetchByTime();
  },
  components: {
    PassageBrowser
  },
  methods: {
    async fetchByTime() {
      try {
        this.passages = await psgAPI.fetchByTime(this.time);
        mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
.disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.disabled:hover {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
}
</style>
