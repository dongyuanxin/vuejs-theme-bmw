<template>
  <div id="app">
    <second-header></second-header>
    <!-- <body-header></body-header> -->
    <router-view/>
    <body-footer></body-footer>
    <div class="back-to-top" :class="{hidden : hidenBtn}" @click="backToTop">
      <span>
        <i class="iconfont icon-60"></i>{{viewPercent}}%
      </span>
    </div>
    <div id="aplayer"></div>
    <aside id="sidebar">
      <p id="sidebar-header"></p>
      <ol id="sidebar-toc"></ol>
    </aside>
  </div>
</template>

<script>
import "APlayer/dist/APlayer.min.css";
import APlayer from "APlayer";

import "@/assets/css/base.scss";
import "@/assets/icon/iconfont.css";

import BodyFooter from "@/components/body/BodyFooter.vue";
import BodyHeader from "@/components/body/BodyHeader.vue";
import SecondHeader from "@/components/body/BodyHeader2.vue";

import Music from "@/vendor/music.js";

const musicAPI = new Music();

export default {
  name: "App",
  components: {
    BodyHeader,
    BodyFooter,
    SecondHeader
  },
  data() {
    return {
      viewPercent: 0,
      timer: null
    };
  },
  mounted() {
    if (document.body.clientWidth >= 480) {
      // this.playMusic();
    }
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
    },
    async playMusic() {
      let audio = await musicAPI.fetch();
      setTimeout(() => {
        let ap = new APlayer({
          container: document.querySelector("#aplayer"),
          fixed: true,
          theme: "#ffa081",
          autoplay: false,
          listMaxHeight: 90,
          lrcType: 0,
          audio
        });
        ap.on("error", () => ap.pause());
      }, 1000 * 6);
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  // max-width: 1170px; /* max-width 可以兼容手机屏幕 */
  margin: 0 auto;
  background-color: white;
  padding: 5rem 2rem 1rem;
  transition: 0.15s;
  position: relative;
}

@media (max-width: 768px) {
  #app {
    padding: 2.5rem 1.5rem 0.5rem;
  }
}

.back-to-top {
  display: block;
  position: fixed;
  z-index: 900;
  right: 2rem;
  bottom: 2rem;
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

#sidebar {
  width: 0;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 600;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.15s;
  display: block;
}

#app.sidebar-active {
  margin: 0;
  margin-right: 250px;
  max-width: none;
}

#sidebar.sidebar-active {
  width: 250px;
}

@media (max-width: 768px) {
  #app.sidebar-active {
    margin-right: 200px;
  }
  #sidebar.sidebar-active {
    width: 200px;
  }
}

.hidden {
  display: none;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
