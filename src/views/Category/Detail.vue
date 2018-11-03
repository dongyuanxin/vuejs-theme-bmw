<template>
  <div class="container">
    <timeline :passages="passages">
      <span slot="meta">不错！一共有{{total}}篇相关文章！</span>
      <span slot="title">分类：{{category}}</span>
    </timeline>
  </div>
</template>

<script>
import Timeline from "@/components/passage/Timeline";

import { scrollToBottom } from "@/assets/js/dom.js";
import Passage from "@/vendor/passage.js";

const psgAPI = new Passage();

export default {
  data() {
    return {
      page: 1,
      limit: 10,
      category: "",
      total: " ? ",
      passages: []
    };
  },
  mounted() {
    this.category = this.$route.params.category;
    psgAPI.calcCategoryCount(this.category).then(res => (this.total = res));
    this.fetchByCategory();
    document.addEventListener("scroll", this.handleScroll, false);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.handleScroll, false);
  },
  components: {
    Timeline
  },
  methods: {
    handleScroll() {
      scrollToBottom(this.fetchByCategory);
    },
    async fetchByCategory() {
      return new Promise((resolve, reject) => {
        psgAPI
          .fetchByCategory(this.category, this.page, this.limit)
          .then(res => {
            this.page += 1;
            if (res.length === 0) {
              document.removeEventListener("scroll", this.handleScroll, false);
              return resolve();
            }
            this.passages = this.passages.concat(res);
            return resolve();
          })
          .catch(error => {
            document.removeEventListener("scroll", this.handleScroll, false);
            return reject(error);
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // padding-top: 50px;
  font-size: 1.4rem;
}
</style>
