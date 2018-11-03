<template>
  <div class="container">
    <timeline :passages="passages">
      <span slot="meta">不错！一共有 {{total}} 篇文章！</span>
      <span slot="title">2018</span>
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
      passages: [],
      total: " ? ",
      page: 1,
      limit: 20
    };
  },
  components: {
    Timeline
  },
  mounted() {
    psgAPI.calculate().then(res => (this.total = res));
    this.fetchPassages();
    document.addEventListener("scroll", this.handleScroll, false);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    handleScroll() {
      scrollToBottom(this.fetchPassages);
    },
    fetchPassages() {
      return new Promise((resolve, reject) => {
        psgAPI
          .fetchForTimeline(this.page, this.limit)
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
  font-size: 1.4rem;
}
</style>

