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
          <a href="javascript:void(0);">{{ psg.createTime.substr(0,10) }}</a>
        </span>
      </div>
      <div class="article-content">
        <div class="markdown-body" v-html="mdToHtml(psg.summary)"></div>
      </div>
      <div class="article-footer">
        <div class="article-meta pull-left">
          <span>
            <i class="iconfont icon-tag"></i>分类:
            <router-link :to="{path: '/blog', query: {catergory: psg.category}}">
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
import Passage from "@/vendor/passage.js";
import Markdown from "@/vendor/markdown.js";

const psgAPI = new Passage();
const mdAPI = new Markdown();

export default {
  props: {
    page: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      passages: []
    };
  },
  mounted() {
    this.fetchPassages();
  },
  watch: {
    page(to, from) {
      if (to === from) return;
      this.fetchPassages();
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
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  position: relative;
  display: block;
  padding: 8rem 0;
}
@media (max-width: 768px) {
  .post {
    padding: 2.5em 0;
  }
}

.post:not(:first-child)::before {
  content: "";
  width: 150px;
  height: 1px;
  background-color: #e0e0e0;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -75px;
}

.article-title {
  display: block;
  position: relative;
  color: #212121;
  font-size: 2.4rem;
  line-height: 1.3;
  text-align: center;
  margin: 0;
  padding: 0 2rem;

  a {
    display: block;
    color: #212121;

    span {
      padding-bottom: 3px;
      transition: 0.15s;
      box-shadow: inset 0 -2px 0 rgba(240, 56, 56, 0);
    }
  }

  a:active,
  a:hover {
    outline: 0px;
    span {
      box-shadow: inset 0 -2px 0 rgba(240, 56, 56, 0.4);
    }
  }
}

.article-top-meta {
  position: relative;
  color: #9e9e9e;
  font-size: 1.3rem;
  text-align: center;
  margin: 1rem 0;

  span {
    margin: 0 0.5rem;

    a {
      color: #9e9e9e;
      font-style: italic;
      transition: 0.15s;
    }

    a:hover {
      color: #f03838;
    }
  }
}

.article-content {
  margin: 4rem 0;
  font-size: 1.6rem;
  color: #424242;
  .markdown-body {
    margin: 0 auto;
  }
}

.article-footer {
  .article-meta {
    font-size: 1.3rem;
    color: #9e9e9e;

    span {
      display: inline-block;
    }
    span:not(:last-child) {
      margin-right: 3rem;
    }

    i {
      vertical-align: middle;
      color: #757575;
      margin-right: 0.5rem;
    }

    a {
      transition: 0.15s;
      color: #9e9e9e;
    }
    a:hover {
      color: #f03838;
    }
  }
  .pull-left {
    float: left;
  }
  .pull-right {
    float: right;
  }

  &::after {
    content: " ";
    display: block;
    clear: both;
  }
}
</style>


