<template>
  <div class="container">
    <passage-browser :passages="passages"></passage-browser>
    <nav class="page-navigation">
      <a href="javascript:void(0);" @click.prevent ="fetchByCategory" :class="{disabled: finishLoad}">{{buttonMeta}}</a>
    </nav>
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
      page: 1,
      limit: 10,
      category: "",
      passages: [],
      finishLoad: false
    };
  },
  mounted() {
    this.category = this.$route.params.category;
    this.fetchByCategory();
  },
  watch: {
    $route(to, from) {
      this.finishLoad = false;
      this.category = this.$route.params.category;
      this.passages.splice(0);
      this.fetchByCategory();
    }
  },
  computed: {
    buttonMeta() {
      return this.finishLoad ? "加载完毕" : "加载更多";
    }
  },
  components: {
    PassageBrowser
  },
  methods: {
    async fetchByCategory() {
      try {
        let morePassages = await psgAPI.fetchByCategory(
          this.category,
          this.page,
          this.limit
        );
        if (morePassages.length > 0) {
          this.passages = this.passages.concat(morePassages);
          this.page += 1;
          mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
        } else {
          this.finishLoad = true;
        }
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
