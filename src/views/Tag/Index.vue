<template>
  <div class="container">
    <div>
      <h3>
        共计 {{tagCount}} 个标签
      </h3>
      <span v-for="(tag, index) in tags" :key="'tag' + index" class="tag-item">
        <router-link :to="{name: 'tag-detail', params: {tag: tag.name}}"> {{tag.name}} </router-link>
        <i>
          [{{ tag.count }}]
        </i>
      </span>
    </div>
  </div>
</template>
<script>
import Passage from "@/vendor/passage.js";

const psgAPI = new Passage();

export default {
  data() {
    return {
      tags: []
    };
  },
  beforeMount() {
    this.fetchTags();
  },
  computed: {
    tagCount() {
      return this.tags.length;
    }
  },
  methods: {
    async fetchTags() {
      try {
        let _ = await psgAPI.fetchTagWithCount();
        _.sort((a, b) => {
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
          return 0;
        });
        this.tags = _;
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  line-height: 3;
  h3 {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 500;
    margin: 3rem 0 2rem;
  }
}

%item {
  display: inline-block;
  margin: 0.4rem 1.4rem;
  font-size: 1.6rem;
  font-family: "Monda", "PingFang SC", "Microsoft YaHei", sans-serif;

  a {
    display: inline-block;
    position: relative;
    color: #555;
    text-decoration: none;
    padding: 0 0.3rem;

    &::before {
      content: "";
      position: absolute;
      width: 0;
      right: 0;
      bottom: 0;
      height: 2px;
      background: #f03838;
      transition: all 0.3s ease;
    }

    &:hover {
      color: #f03838;
    }

    &:hover::before {
      width: 100%;
      left: 0;
      right: auto;
    }
  }

  i {
    color: #bbb;
    font-style: normal;
    padding: 0 0.2rem;
  }
}

.tag-item {
  @extend %item;
}
</style>


