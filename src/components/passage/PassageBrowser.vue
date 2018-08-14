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
            <router-link :to="{path: '/search', query: {category: psg.category}}">
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
import Hub from "@/vendor/hub.js";

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
      passages: [],
      nextPage: 1
    };
  },
  mounted() {
    Hub.$on("loadmore", () => {
      this.fetchByCategory(true);
    });
    this.nextPage = this.page + 1;
    this.passages = [];
    if (this.search === false) {
      this.fetchPassages();
      return;
    }
    if (this.searchKey === "time") {
      this.fetchByTime();
    } else if (this.searchKey === "category") {
      this.fetchByCategory(false);
    }
  },
  watch: {
    page(to, from) {
      this.watchProp(to, from);
    },
    searchKey(to, from) {
      this.watchProp(to, from);
    },
    searchValue(to, from) {
      this.watchProp(to, from);
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
    async fetchByCategory(next) {
      try {
        let morePassages = await psgAPI.fetchByCategory(
          this.searchValue,
          next ? this.nextPage : this.page,
          this.limit
        );
        if (morePassages.length > 0) {
          this.passages = next
            ? this.passages.concat(morePassages)
            : morePassages; // router query change will cause 2 flush in 'watch:'
          this.nextPage = next ? this.nextPage + 1 : this.nextPage;
        } else {
          Hub.$emit("finish-load");
        }
      } catch (error) {}
    },
    async fetchByTime() {
      try {
        this.passages = await psgAPI.fetchByTime(this.searchValue);
      } catch (error) {
        this.passages = [];
      }
    },
    watchProp(to, from) {
      this.nextPage = this.page + 1;
      if (to === from) {
        return;
      }
      if (this.search === false) {
        this.fetchPassages();
        return;
      }
      if (this.searchKey === "time") {
        this.fetchByTime();
      } else if (this.searchKey === "category") {
        this.fetchByCategory(false);
      }
    }
  }
};
</script>
