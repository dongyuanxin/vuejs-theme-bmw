<template>
  <div class="container">
    <passage-viewer :id="id"></passage-viewer>
    <nav class="post-navigation">
      <div class="nav-pre">
        <i class="iconfont icon-prev"></i>
        <router-link :to="'/passage/' + prevId" v-if="showPrevButton">{{preTitle}}</router-link>
      </div>
      <div class="nav-next">
        <router-link :to="'/passage/' + nextId" v-if="showNextButton">{{nextTitle}}</router-link>
        <i class="iconfont icon-next"></i>
      </div>
    </nav>
    <a href="#comment" class="comment-anchor"></a>
    <div class="comment-title"><i class="iconfont icon-footprint"></i> 留下足迹 <i class="iconfont icon-footprint"></i></div>
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
      preTitle: "上一篇",
      nextTitle: "下一篇",
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
          this.preTitle = res.prev.title;
        }
        this.showNextButton = res.next.exist;
        if (this.showNextButton) {
          this.nextId = res.next.id;
          this.nextTitle = res.next.title;
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

<style lang="scss" scoped>
.post-navigation {
  clear: both;
  margin: 1.5rem 0;
  width: 100%;
  border-top: 1px solid #eee;
  font-size: 1.4rem;
  color: #555;

  position: relative;

  &::after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  
  div {
    padding: 10px 0 0 0;
    width: 45%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;

    .iconfont {
      position: absolute;
      top: 50%;
      transform: tranlate(0, -50%);
      font-weight: bolder;
      font-size: .8em;
    }

    a {
      line-height: 2.5rem;
      transition: all .1s linear;
      color: #555;

      &:hover {
        color: #222;
      }
    }
  }

  div.nav-pre {
    float: left;
    padding-left: 1rem;
    .iconfont {
      left: 0;
    }
  }

  div.nav-next {
    float:right;
    padding-right: 1rem;  
    .iconfont {
      right: 0;
    }
  }

}

.comment-title {
  margin: 8rem 0 1.4rem;
  font-size: 2rem;
  font-weight: 400;

  .iconfont {
    font-size: 1em;
  }
}
</style>
