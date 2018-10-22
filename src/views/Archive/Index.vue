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
    psgAPI.fetch(this.page, this.limit, true).then(res => {
      this.passages = res;
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 50px;
  font-size: 1.4rem;
}
</style>

