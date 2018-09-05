<template>
  <div class="container">
    <passage-browser :page="page" :limit="limit" :search="true" :search-key="searchKey" :search-value="searchValue"></passage-browser>
    <nav class="page-navigation">
      <a href="javascript:void(0);" v-if="showButton" @click.prevent ="loadMore" :class="{disabled: finishLoad}">{{buttonMeta}}</a>
    </nav>
  </div>
</template>

<script>
import "@/assets/css/article.scss";

import PassageBrowser from "@/components/passage/PassageBrowser";
import Passage from "@/vendor/passage.js";
import Hub from "@/vendor/hub.js";

const psgAPI = new Passage();

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      showButton: false,
      searchKey: "",
      searchValue: "",
      finishLoad: false
    };
  },
  beforeMount() {
    Hub.$on("finish-load", () => {
      this.finishLoad = true;
    });
    this.handleRoute();
    this.handleButton();
  },
  watch: {
    $route(to, from) {
      this.handleRoute();
      this.handleButton();
    }
  },
  computed: {
    buttonMeta() {
      return this.finishLoad ? "加载完毕" : "加载更多 ...";
    }
  },
  components: {
    PassageBrowser
  },
  methods: {
    handleButton() {
      this.finishLoad = false;
      if (this.$route.query.hasOwnProperty("time")) {
        this.showButton = false;
      } else if (this.$route.query.hasOwnProperty("category")) {
        this.showButton = true;
      } else if (this.$route.query.hasOwnProperty("tag")) {
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
      } else if (this.$route.query.hasOwnProperty("tag")) {
        this.searchKey = "tag";
        this.searchValue = this.$route.query["tag"];
      }
    },
    loadMore() {
      if (this.finishLoad) {
        return;
      }
      console.log("Load more passages");
      Hub.$emit("loadmore");
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
