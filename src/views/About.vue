<template>
  <div class="container">
    <div class="markdown-body" v-html="contentHtml"></div>
  </div>
</template>

<script>
import Markdown from "@/vendor/markdown.js";
import Introduct from "@/vendor/introduct.js";

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
  margin-top: 6rem;
}
.markdown-body {
  margin-bottom: 3rem;
}
</style>

