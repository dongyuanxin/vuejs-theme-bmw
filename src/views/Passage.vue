<template>
  <div class="container">
    <passage-viewer :id="id"></passage-viewer>
    <nav class="page-navigation">
      <router-link :to="'/passage/' + prevId" v-if="showPrevButton">上一篇</router-link>
      <router-link :to="'/passage/' + nextId" v-if="showNextButton">下一篇</router-link>
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
      showPrevButton: false,
      showNextButton: false,
      prevId: 1,
      nextId: 1
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
      try {
        let res = await psgAPI.checkPrevAndNext(this.id);
        this.showPrevButton = res.prev.exist;
        if (this.showPrevButton) {
          this.prevId = res.prev.id;
        }
        this.showNextButton = res.next.exist;
        if (this.showNextButton) {
          this.nextId = res.next.id;
        }
      } catch (error) {
        this.showPrevButton = false;
        this.showNextButton = false;
      }
    }
  }
};
</script>
