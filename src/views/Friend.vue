<template>
  <div class="container">
    <div class="friend-navigation">
      <div class="card" v-for="(item, index) in friends" :key="index">
        <img :src="item.headImgUrl">
        <p class="card-header">
          @ <a :href="item.site" target="_blank">{{item.nickname}}</a>
        </p>
        <p class="card-meta">
          {{item.meta}}
        </p>
      </div>
    </div>
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
import Friend from "@/vendor/friend.js";
import Introduct from "@/vendor/introduct.js";
import "@/assets/css/vcomments.scss";
import { lc } from "@/vendor/setting.js";

const mdAPI = new Markdown();
const friendAPI = new Friend();
const introductAPI = new Introduct();

export default {
  data() {
    return {
      friends: [],
      content: "",
      page: 1,
      step: 50
    };
  },
  mounted() {
    // Not need to listen scroll, because site is too less
    new Valine({
      el: "#vcomments",
      appId: lc.i,
      appKey: lc.k,
      notify: false,
      verify: false,
      avatar: "robohash",
      placeholder: "正确填写邮箱, 才能及时收到回复哦♪(^∇^*)",
      path: "friend"
    });
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
        let contents = await introductAPI.fetch("friend", 1, 1);
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
.friend-navigation {
  padding: 0 0 3.5rem;
  &::after {
    content: " ";
    display: block;
    clear: both;
  }
}

.card {
  width: 320px;
  font-size: 1.6rem;
  line-height: 30px;
  padding: 10px 20px;
  border-radius: 3px;
  transition-duration: 0.15s;
  margin-bottom: 2.3rem;
  cursor: pointer;

  &:nth-child(odd) {
    float: left;
  }
  &:nth-child(even) {
    float: right;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #f7f7f7;
  }

  img {
    width: 5rem;
    height: 5rem;
    float: left;
    margin-top: 5px;
    margin-right: 1em;
  }

  .card-header {
    font-style: italic;
    a {
      font-style: normal;
      color: #f03838;
      font-weight: bold;
      text-decoration: none;
    }
    a:hover {
      color: #f03838;
      text-decoration: none;
    }
  }

  .card-meta {
    font-size: 1.4rem;
    color: #9e9e9e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 0.15rem;
  }
}

@media (max-width: 768px) {
  .card {
    float: none !important;
    margin: 0 auto 1.6rem !important;
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

