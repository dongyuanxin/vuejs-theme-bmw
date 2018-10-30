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
      psgAPI
        .fetch(this.page, this.limit, true)
        .then(res => {
          this.page += 1;
          if (res.length === 0) {
            document.removeEventListener("scroll", this.handleScroll, false);
            return;
          }
          this.passages = this.passages.concat(res);
        })
        .catch(error =>
          document.removeEventListener("scroll", this.handleScroll, false)
        );
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

