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
  </div>
</template>

<script>
import { md } from "@/vendor/setting.js";
import Markdown from "@/vendor/markdown.js";
import Friend from "@/vendor/friend.js";

const mdAPI = new Markdown();
const friendAPI = new Friend();

export default {
  data() {
    return {
      friends: [],
      contentHtml: mdAPI.format(md.friend),
      page: 1,
      step: 20
    };
  },
  mounted() {
    // Not need to listen scroll, because site is too less
    this.fetchFriends();
  },
  methods: {
    fetchFriends() {
      friendAPI.fetch(this.page, this.step).then(res => {
        this.friends = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.friend-navigation {
  padding: 8rem 0 3.5rem;
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
</style>

