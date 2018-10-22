<template>
  <div class="container">
    <timeline :passages="passages">
      <span slot="meta">不错！一共有{{total}}篇相关文章！</span>
      <span slot="title">标签：{{tag}}</span>
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
      limit: 20,
      tag: "",
      total: " ? ",
      passages: []
    };
  },
  mounted() {
    this.tag = this.$route.params.tag;
    psgAPI.calcTagCount(this.tag).then(res => (this.total = res));
    this.fetchByTag();
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
      scrollToBottom(this.fetchByTag);
    },
    async fetchByTag() {
      try {
        let morePassages = await psgAPI.fetchByTag(
          this.tag,
          this.page,
          this.limit
        );
        this.page += 1;
        if (morePassages.length === 0) {
          document.removeEventListener("scroll", this.handleScroll, false);
          return;
        }
        this.passages = this.passages.concat(morePassages);
      } catch (error) {
        document.removeEventListener("scroll", this.handleScroll, false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 50px;
  font-size: 1.4rem;
}
</style>
