<template>
  <div class="container">
    <passage-viewer :id="id"></passage-viewer>
    <nav class="page-navigation">
      <router-link :to="'/passage/' + prevId" v-if="showPrevButton">上一篇</router-link>
      <router-link :to="'/passage/' + nextId" v-if="showNextButton">下一篇</router-link>
    </nav>
    <a href="#comment" id="comment-anchor"></a>
    <div id="vcomments"></div>
  </div>
</template>

<script>
import AV from "leancloud-storage";
import Valine from "valine";
window.AV = AV;

import "@/assets/css/article.scss";
import "@/assets/css/vcomments.scss";

import PassageViewer from "@/components/passage/PassageViewer";
import Passage from "@/vendor/passage.js";
import { lc } from "@/vendor/setting.js";

const psgAPI = new Passage();

export default {
  data() {
    return {
      id: 0,
      showPrevButton: false,
      showNextButton: false,
      prevId: 1,
      nextId: 1,
      vcomments: null
    };
  },
  beforeMount() {
    this.id = this.$route.params.id.toString();
    this.handleButton();
  },
  mounted() {
    this.initValine();
  },
  watch: {
    $route(to, from) {
      this.id = this.$route.params.id.toString();
      this.initValine();
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
    },
    initValine() {
      this.vcomments = new Valine({
        el: "#vcomments",
        appId: lc.i,
        appKey: lc.k,
        notify: false,
        verify: false,
        avatar: "robohash",
        placeholder: "正确填写邮箱, 才能及时收到回复哦♪(^∇^*)",
        path: this.id
      });
    }
  }
};
</script>

<style scoped>
#comment-anchor {
  display: none;
}
</style>
