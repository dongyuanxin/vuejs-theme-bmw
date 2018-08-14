<template>
  <div>
    <div class="post">
      <h3 class="article-title">
        <span>{{ psg.title }}</span>
      </h3>
      <div class="article-top-meta">
        <span>
          发布 : 
          <router-link :to="{path: '/blog', query: {time: psg.createTime.substr(0,10)}}">
            {{ psg.createTime.substr(0,10) }}
          </router-link>
        </span>
        <span>
          分类 :
          <router-link :to="{path: '/blog', query: {catergory: psg.category}}">
            {{ psg.category }}
          </router-link>
        </span>
        <span>
          浏览 : {{psg.scanTimes + 1}}
        </span>
      </div>
      <div class="article-content">
        <div class="markdown-body" v-html="mdToHtml(psg.content)"></div>
      </div>
      <div class="article-footer">
        <div class="article-meta pull-left">
          <span>
            <i class="iconfont icon-06tags"></i> 标签: #{{psg.category}}
          </span>
        </div>
        <div class="article-meta pull-right">
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
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      psg: {
        createTime: "",
        category: "",
        title: "",
        content: ""
      }
    };
  },
  mounted() {
    this.fetchPassages();
  },
  watch: {
    id(to, from) {
      if (to === from) return;
      this.fetchPassages();
    }
  },
  methods: {
    mdToHtml(md) {
      return mdAPI.format(md);
    },
    fetchPassages() {
      this.psg = {
        createTime: "",
        category: "",
        title: "",
        content: ""
      };

      psgAPI.search(this.id).then(res => {
        this.psg = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.article-top-meta span {
  color: #9e9e9e;
  font-style: italic;
}
</style>
