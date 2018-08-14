<template>
  <div>
    <div class="post" v-for="(psg, index) in passages" :key="index">
      <h3 class="article-title">
        <router-link :to = "'/passage/' + psg.id">
          <span>{{ psg.title }}</span>
        </router-link>
      </h3>
      <div class="article-top-meta">
        <span>
          <router-link :to="{path: '/search', query: {time: psg.createTime.substr(0,10)}}">
            {{ psg.createTime.substr(0,10) }}
          </router-link>
        </span>
      </div>
      <div class="article-content">
        <div class="markdown-body" v-html="mdToHtml(psg.summary)"></div>
      </div>
      <div class="article-footer">
        <div class="article-meta pull-left">
          <span>
            <i class="iconfont icon-tag"></i>分类:
            <router-link :to="{path: '/search', query: {catergory: psg.category}}">
              {{psg.category}}
            </router-link>
          </span>
          <span>
            <i class="iconfont icon-06tags"></i> 标签: #{{psg.category}}
          </span>
        </div>
        <div class="article-meta pull-right">
          <span>
            <i class="iconfont icon-view"></i>浏览: {{psg.scanTimes}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/css/article.scss";

import Passage from "@/vendor/passage.js";
import Markdown from "@/vendor/markdown.js";

const psgAPI = new Passage();
const mdAPI = new Markdown();

export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 5
    },
    search: {
      type: Boolean,
      default: false
    },
    searchKey: {
      type: String,
      default: ""
    },
    searchValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      passages: []
    };
  },
  mounted() {
    if (this.search === false) {
      this.fetchPassages();
      return;
    }
    if (this.searchKey === "time") {
      this.fetchByTime();
    } else if (this.searchKey === "category") {
      this.fetchByCategory();
    }
  },
  watch: {
    page(to, from) {
      if (to === from) return;
      if (this.search === false) {
        this.fetchPassages();
        return;
      }
      if (this.searchKey === "time") {
        this.fetchByTime();
      } else if (this.searchKey === "category") {
        this.fetchByCategory();
      }
    }
  },
  methods: {
    mdToHtml(md) {
      return mdAPI.format(md);
    },
    fetchPassages() {
      if (this.page <= 0) return;
      this.passages = [];
      psgAPI.fetch(this.page, this.limit, true).then(res => {
        this.passages = res;
      });
    },
    fetchByCategory() {},
    async fetchByTime() {
      try {
        this.passages = await psgAPI.fetchByTime(this.searchValue);
      } catch (error) {
        this.passages = [];
      }
    }
  }
};
</script>
