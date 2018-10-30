<template>
  <div>
    <div class="post" v-for="(psg, index) in passages" :key="index">
      <h1 class="article-title">
        <router-link :to = "'/passage/' + psg.id">
          <span>{{ psg.title }}</span>
        </router-link>
      </h1>
      <!-- PC端文章信息 -->
      <div class="article-top-meta pc-view">
        <span>
          发布时间 : 
          <router-link :to="{name: 'archive-detail', params: {time: psg.createTime.substr(0,10)}}">
            {{ psg.createTime.substr(0,10) }}
          </router-link>
        </span>
      </div>
      <!-- 移动端文章信息 -->
      <div class="article-top-meta mobile-view">
        <span>
          发布 : 
          <router-link :to="{name: 'archive-detail', params: {time: psg.createTime.substr(0,10)}}">
            {{ psg.createTime.substr(0,10) }}
          </router-link>
        </span>
        <span>
          分类 :
          <router-link :to="{name: 'category-detail', params: {category: psg.category}}">
            {{ psg.category }}
          </router-link>
        </span>
        <span>
          浏览 : {{psg.scanTimes + 1}}
        </span>
      </div>
      <!-- 文章简介 -->
      <div class="article-content">
        <div class="markdown-body article-content--inner" v-html="mdToHtml(psg.summary)"></div>
      </div>
      <div class="article-footer">
        <div class="article-meta pull-left">
          <!-- 分类pc端可见 -->
          <span class="pc-view">
            <i class="iconfont icon-tag"></i>分类:
            <router-link :to="{name: 'category-detail', params: {category: psg.category}}">
              {{psg.category}}
            </router-link>
          </span>
          <span>
            <i class="iconfont icon-06tags"></i>标签:
            <span v-for="(tag, tagIndex) in psg.tags" :key="tagIndex" class="span--tag">
              <router-link :to="{name: 'tag-detail', params: {tag: tag}}">
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

import Markdown from "@/vendor/markdown.js";

const mdAPI = new Markdown();

export default {
  props: {
    passages: {
      type: Array,
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    mdToHtml(md) {
      return mdAPI.format(md);
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
