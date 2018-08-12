<template>
  <div id="app">
    <body-header></body-header>
    <router-view/>
    <body-footer></body-footer>
  </div>
</template>

<script>
import "@/assets/css/base.scss";
import "@/assets/icon/iconfont.css";

import BodyFooter from "@/components/body/BodyFooter.vue";
import BodyHeader from "@/components/body/BodyHeader.vue";
export default {
  name: "App",
  components: {
    BodyHeader,
    BodyFooter
  }
};
</script>

<style lang="scss" scoped>
#app {
  max-width: 1170px; /* max-width 可以兼容手机屏幕 */
  margin: 0 auto;
  background-color: white;
  padding: 80px 10px 10px;
}
</style>
