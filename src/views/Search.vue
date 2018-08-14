<template>
  <div class="container">
    <passage-browser :page="page" :limit="limit" :search="true" :search-key="searchKey" :search-value="searchValue"></passage-browser>
    <nav class="page-navigation">
      <a href="" v-if="showButton"> 加载更多... </a>
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
      showButton: false,
      searchKey: "",
      searchValue: ""
    };
  },
  beforeMount() {
    this.handleRoute();
    this.handleButton();
  },
  watch: {
    $route(to, from) {
      this.handleRoute();
      this.handleButton();
    }
  },
  components: {
    PassageBrowser
  },
  methods: {
    handleButton() {
      if (this.$route.query.hasOwnProperty("time")) {
        this.showButton = false;
      } else if (this.$route.query.hasOwnProperty("category")) {
        this.showButton = true;
      }
    },
    handleRoute() {
      if (this.$route.query.hasOwnProperty("time")) {
        this.searchKey = "time";
        this.searchValue = this.$route.query["time"];
      } else if (this.$route.query.hasOwnProperty("category")) {
        this.searchKey = "category";
        this.searchValue = this.$route.query["category"];
      }
    }
  }
};
</script>
