<template>
  <div class="container">
    <passage-browser :passages="passages"></passage-browser>
    <nav class="page-navigation">
      <router-link :to="'/blog/' + (page - 1)" v-if="showPrevButton">上一页</router-link>
      <router-link :to="'/blog/' + (page + 1)" v-if="showNextButton">下一页</router-link>
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
      total: -1,
      passages: [],
      showPrevButton: false,
      showNextButton: false
    };
  },
  mounted() {
    this.page = parseInt(this.$route.params.page, 10);
    this.handleButton();
    this.fetchPassages();
  },
  watch: {
    $route(to, from) {
      this.page = parseInt(this.$route.params.page, 10);
      this.passages.splice(0);

      this.handleButton();
      this.fetchPassages();
    }
  },
  components: {
    PassageBrowser
  },
  methods: {
    async handleButton() {
      this.total = await psgAPI.calculate();
      if (this.total > this.page * this.limit) {
        this.showNextButton = true;
      } else {
        this.showNextButton = false;
      }
      if (this.page > 1) {
        this.showPrevButton = true;
      } else {
        this.showPrevButton = false;
      }
    },
    fetchPassages() {
      psgAPI.fetch(this.page, this.limit, true).then(res => {
        this.passages = res;
        mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
      });
    }
  }
};
</script>
