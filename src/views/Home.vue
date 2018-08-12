<template>
  <div class="container">
    <passage-browser :page="page" :limit="limit"></passage-browser>
    <nav class="page-navigation">
      <router-link to="/blog/2">下一页</router-link>
    </nav>
  </div>
</template>

<script>
import "@/assets/css/article.scss";

import PassageBrowser from "@/components/passage/PassageBrowser";

export default {
  data() {
    return {
      page: 1,
      limit: 5
    };
  },
  components: {
    PassageBrowser
  }
};
</script>
