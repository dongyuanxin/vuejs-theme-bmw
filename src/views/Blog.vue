<template>
  <div class="container">
    <passage-browser :page="page" :limit="limit"></passage-browser>
    <nav class="page-navigation">
      <router-link :to="'/blog/' + (page - 1)" v-if="showPrevButton">上一页</router-link>
      <router-link :to="'/blog/' + (page + 1)" v-if="showNextButton">下一页</router-link>
    </nav>
  </div>
</template>

<script>
import "@/assets/css/article.scss";

import PassageBrowser from "@/components/passage/PassageBrowser";
import Passage from "@/vendor/passage.js";

const psgAPI = new Passage();

export default {
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      showPrevButton: false,
      showNextButton: false
    };
  },
  beforeMount() {
    this.page = parseInt(this.$route.params.page, 10);
    this.handleButton();
  },
  watch: {
    $route(to, from) {
      this.page = parseInt(this.$route.params.page, 10);
      this.handleButton();
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
    }
  }
};
</script>
