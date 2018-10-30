<template>
  <div class="container">
    <div class="markdown-body" v-html="contentHtml"></div>
    <a href="#comment" class="comment-anchor"></a>
    <div id="vcomments"></div>
  </div>
</template>

<script>
import AV from "leancloud-storage";
import Valine from "valine";
window.AV = AV;

import Markdown from "@/vendor/markdown.js";
import Introduct from "@/vendor/introduct.js";
import "@/assets/css/vcomments.scss";
import { lc } from "@/vendor/setting.js";

const mdAPI = new Markdown();
const introductAPI = new Introduct();

export default {
  data() {
    return {
      friends: [],
      content: "",
      page: 1,
      step: 20
    };
  },
  mounted() {
    // Not need to listen scroll, because site is too less
    this.fetchFriends();
    this.fetchCotent();
    new Valine({
      el: "#vcomments",
      appId: lc.i,
      appKey: lc.k,
      notify: false,
      verify: false,
      avatar: "robohash",
      placeholder: "正确填写邮箱, 才能及时收到回复哦♪(^∇^*)",
      path: "about"
    });
  },
  computed: {
    contentHtml() {
      return mdAPI.format(this.content);
    }
  },
  methods: {
    async fetchFriends() {
      try {
        this.friends = await friendAPI.fetch(this.page, this.step);
      } catch (error) {
        this.friends = [];
      }
    },
    async fetchCotent() {
      try {
        let contents = await introductAPI.fetch("about", 1, 1);
        if (contents.length < 1) {
          this.content = "";
        } else {
          this.content = contents[0].content;
        }
      } catch (error) {
        this.content = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  // padding-top: 6rem;
}

@media (max-width: 768px) {
  .container {
    padding-top: 4rem;
  }
}

.markdown-body {
  margin-bottom: 3rem;
}

#vcomments {
  margin-top: 8rem;
}

@media (max-width: 768px) {
  #vcomments {
    margin-top: 5rem !important;
  }
}
</style>

