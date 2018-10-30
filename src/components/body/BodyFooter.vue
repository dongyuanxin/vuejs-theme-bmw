<template>
  <footer>
    <p class="site-info">
      博客已萌萌哒运行{{ timeStr }}<span class="my-face">(●'◡'●)ﾉ♥</span>
      <br>
      <a href="https://www.google.com/analytics/" target="_blank">Google Analytics</a> 提供网站统计服务. 
      <a href="https://cloud.tencent.com/" target="_blank">Tencent Cloud</a> 提供CDN服务. 
      <a href="https://sg.godaddy.com/"  target="_blank">GoDaddy</a> 提供域名注册服务. 
      <a href="https://www.dnspod.cn/" target="_blank">DNSPod</a> 提供DNS解析服务. 
      <br>
      由 <a href="https://vuejs.org/" target="_blank">VueJs</a> + <a href="https://koa.bootcss.com/" target="_blank">Koa2</a> + <a href="https://webpack.github.io/" target="_blank">Webpack</a> 强力驱动.
      运行于 <a href="https://cloud.tencent.com/" target="_blank">Tencent Cloud</a> 云服务器. 
      <a href="https://www.trustasia.com/" target="_blank">TrustAsia</a> 签发SSL证书. 
      <a href="http://www.miibeian.gov.cn/state/outPortal/loginPortal.action" target="_blank">粤ICP备18028400号</a> .
      <br>
      Vesion is v4.0. Made by 💗GodBMW( <a href="https://github.com/dongyuanxin">董沅鑫</a> ).
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
  background: #f7f7f7;
  margin: 0 -20px;
}

p.site-info {
  display: block;
  color: #9e9e9e;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  line-height: 2;

  a {
    color: #1abc9c;
    border-bottom: 1px solid #1abc9c;
  }
}

.my-face {
  animation: my-face 5s infinite ease-in-out;
  display: inline-block;
  margin: 0 5px;
}
</style>
