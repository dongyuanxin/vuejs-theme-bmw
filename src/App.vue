<template>
  <div id="app">
    <body-header></body-header>
    <router-view/>
    <body-footer></body-footer>
    <div class="back-to-top" :class="{hidden : hidenBtn}" @click="backToTop">
      <span>
        <i class="iconfont icon-60"></i>{{viewPercent}}%
      </span>
    </div>
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
  },
  data() {
    return {
      viewPercent: 0,
      timer: null
    };
  },
  mounted() {
    let app = document.getElementById("app");
    document.addEventListener("scroll", this.throttle(), false);
  },
  computed: {
    hidenBtn() {
      return this.viewPercent >= 1 ? false : true;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    document.removeEventListener("scroll", this.throttle(), false);
  },
  methods: {
    throttle() {
      let isRunning = false;
      return () => {
        if (isRunning) return;
        isRunning = true;
        window.requestAnimationFrame(timestamp => {
          let scrollTop =
              document.documentElement.scrollTop || document.body.scrollTop,
            scrollHeight =
              document.documentElement.scrollHeight ||
              document.body.scrollHeight,
            clientHeight =
              document.documentElement.clientHeight ||
              document.body.clientHeight;
          isRunning = false;
          if (scrollTop <= 1) {
            this.viewPercent = 0;
            return;
          }
          if (scrollTop + clientHeight >= scrollHeight) {
            this.viewPercent = 100;
          } else {
            this.viewPercent = parseInt(
              100 * scrollTop / (scrollHeight - clientHeight),
              10
            );
          }
        });
      };
    },
    backToTop() {
      let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop,
        delay = 10,
        time = 200;
      if (scrollTop <= 20) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        return;
      }
      let step = Math.ceil(scrollTop * delay / time);
      this.timer = setInterval(() => {
        scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop - step <= 0) {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          clearInterval(this.timer);
        } else {
          document.documentElement.scrollTop = scrollTop - step;
          document.body.scrollTop = scrollTop - step;
        }
      }, delay);
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  max-width: 1170px; /* max-width 可以兼容手机屏幕 */
  margin: 0 auto;
  background-color: white;
  padding: 8rem 1rem 1rem;
  transition: 0.15s;
}

@media (max-width: 768px) {
  #app {
    padding: 2.5rem 0.5rem 0.5rem;
  }
}
.back-to-top {
  display: block;
  position: fixed;
  z-index: 900;
  right: 3rem;
  bottom: 3rem;
  cursor: pointer;
  text-align: center;
  background: #222;
  font-size: 1.3rem;
  opacity: 0.6;
  color: #fff;
  padding: 0 0.6rem;
  height: 2.4rem;
  line-height: 2.4rem;
}

@media (max-width: 768px) {
  .back-to-top {
    right: 1rem;
    bottom: 1.5rem;
  }
}

.hidden {
  display: none;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
