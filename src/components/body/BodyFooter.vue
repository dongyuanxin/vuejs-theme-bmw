<template>
  <footer>
    <p class="site-info">
      博客已萌萌哒运行{{ timeStr }}<span class="my-face">(●'◡'●)ﾉ♥</span>
      <br>
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
import "@/assets/css/animation.scss";
export default {
  data() {
    return {
      timeStr: "",
      startTimestamp: 0,
      updateDelay: 500
    };
  },
  mounted() {
    this.startTimestamp = new Date(2018, 2, 10, 23, 58).getTime();
    setTimeout(this.updateTimeStr, this.updateDelay);
  },
  methods: {
    updateTimeStr() {
      let offset = parseInt(
          (new Date().getTime() - this.startTimestamp) / 1000,
          10
        ),
        day = Math.floor(offset / 86400),
        hour = Math.floor((offset % 86400) / 3600),
        minute = Math.floor(((offset % 86400) % 3600) / 60),
        second = Math.floor(((offset % 86400) % 3600) % 60);
      this.timeStr =
        day + "天" + hour + "小时" + minute + "分钟" + second + "秒";
      setTimeout(this.updateTimeStr, this.updateDelay);
    }
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
  font-size: 1.1rem;
  margin: 0.5rem 0;

  a {
    color: #f03838;
  }
}

.my-face {
  animation: my-face 5s infinite ease-in-out;
  display: inline-block;
  margin: 0 5px;
}
</style>
