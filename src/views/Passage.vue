<template>
  <div class="container">
    <passage-viewer :id="id"></passage-viewer>
    <nav class="page-navigation">
      <router-link :to="'/blog/' + (id - 1)" v-if="showPrevButton">上一篇</router-link>
      <router-link :to="'/blog/' + (id + 1)" v-if="showNextButton">下一篇</router-link>
    </nav>
  </div>
</template>

<script>
import "@/assets/css/article.scss";

import PassageViewer from "@/components/passage/PassageViewer";
import Passage from "@/vendor/passage.js";

const psgAPI = new Passage();

export default {
  data() {
    return {
      id: 0,
      showPrevButton: true,
      showNextButton: true
    };
  },
  beforeMount() {
    this.id = this.$route.params.id.toString();
    this.handleButton();
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id.toString();
      this.handleButton();
    }
  },
  components: {
    PassageViewer
  },
  methods: {
    async handleButton() {
      // this.total = await psgAPI.calculate();
      // if (this.total > this.page * this.limit) {
      //   this.showNextButton = true;
      // } else {
      //   this.showNextButton = false;
      // }
      // if (this.page > 1) {
      //   this.showPrevButton = true;
      // } else {
      //   this.showPrevButton = false;
      // }
    }
  }
};
</script>
