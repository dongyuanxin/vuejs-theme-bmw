<template>
  <footer>
    <p class="site-info">
      托管于
      <a href="https://github.com/" target="_blank">Github</a>
      ,
      <a href="https://coding.net/" target="_blank">CODING</a>
      提供CDN服务
      <br>
      由
      <a href="https://vuejs.org/" target="_blank">VueJs</a>
      ,
      <a href="https://koa.bootcss.com/" target="_blank">Koa2</a>
      和
      <a href="https://webpack.github.io/" target="_blank">Webpack</a>
      强力驱动
      <br>
    </p>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
footer {
  display: block;
  position: relative;
  text-align: center;
  line-height: 1.8;
  padding-top: 1rem;
  color: #9e9e9e;
}

p.site-info {
  display: block;
  color: #9e9e9e;
  font-size: 1.3rem;
  margin: 0.5rem 0;

  a {
    color: #f03838;
  }
}
</style>
