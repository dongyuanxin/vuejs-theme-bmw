<template>
  <div>
    <div class="post" v-for="(psg, index) in passages" :key="index">
      <h1 class="article-title">
        <router-link :to = "'/passage/' + psg.id">
          <span>{{ psg.title }}</span>
        </router-link>
      </h1>
      <div class="article-top-meta pc-view">
        <span>
          <router-link :to="{path: '/search', query: {time: psg.createTime.substr(0,10)}}">
            {{ psg.createTime.substr(0,10) }}
          </router-link>
        </span>
      </div>
      <div class="article-top-meta mobile-view">
        <span>
          发布 : 
          <router-link :to="{path: '/search', query: {time: psg.createTime.substr(0,10)}}">
            {{ psg.createTime.substr(0,10) }}
          </router-link>
        </span>
        <span>
          分类 :
          <router-link :to="{path: '/search', query: {category: psg.category}}">
            {{ psg.category }}
          </router-link>
        </span>
        <span>
          浏览 : {{psg.scanTimes + 1}}
        </span>
      </div>
      <div class="article-content">
        <div class="markdown-body article-content--inner" v-html="mdToHtml(psg.summary)"></div>
      </div>
      <div class="article-footer">
        <div class="article-meta pull-left">
          <span class="pc-view">
            <i class="iconfont icon-tag"></i>分类:
            <router-link :to="{path: '/search', query: {category: psg.category}}">
              {{psg.category}}
            </router-link>
          </span>
          <span>
            <i class="iconfont icon-06tags"></i>标签:
            <span v-for="(tag, tagIndex) in psg.tags" :key="tagIndex" class="span--tag">
              <router-link :to="{path: '/search', query: {tag: tag}}">
                #{{ tag }} 
              </router-link>
            </span>
          </span>
        </div>
        <div class="article-meta pull-right">
          <span class="pc-view">
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
      default: 10
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
      if (this.searchKey === "category") {
        this.fetchByCategory(true);
      } else if (this.searchKey === "tag") {
        this.fetchByTag(true);
      }
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
    } else if (this.searchKey === "tag") {
      this.fetchByTag(false);
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
        mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
      });
    },
    async fetchByTag(next) {
      try {
        let morePassages = await psgAPI.fetchByTag(
          this.searchValue,
          next ? this.nextPage : this.page,
          this.limit
        );
        if (morePassages.length > 0) {
          this.passages = next
            ? this.passages.concat(morePassages)
            : morePassages; // router query change will cause 2 flush in 'watch:'
          this.nextPage = next ? this.nextPage + 1 : this.nextPage;
          mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
        } else {
          Hub.$emit("finish-load");
        }
      } catch (error) {}
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
          mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
        } else {
          Hub.$emit("finish-load");
        }
      } catch (error) {}
    },
    async fetchByTime() {
      try {
        this.passages = await psgAPI.fetchByTime(this.searchValue);
        mdAPI.mathJax(document.getElementsByClassName("markdown-body"));
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
      } else if (this.searchKey === "tag") {
        this.fetchByTag(false);
      }
    }
  }
};
</script>

<style lang="scss">
.article-content--inner {
  img {
    max-width: 300px !important;
  }
}

.pc-view {
  display: block;
}
.mobile-view {
  display: none;
}

@media (max-width: 768px) {
  .pc-view {
    display: none !important;
  }
  .mobile-view {
    display: block !important;
    font-style: italic !important;
  }
}
</style>
