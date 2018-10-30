<template>
  <div class="container">
    <div>
      <h3>
        共计 {{categoryCount}} 个分类
      </h3>
      <span v-for="(category, index) in categories" :key="'category' + index" class="category-item">
        <router-link :to="{name: 'category-detail', params: {category: category.name}}"> {{category.name}} </router-link>
        <i>
          [{{ category.count }}]
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
      categories: []
    };
  },
  beforeMount() {
    this.fetchCategories();
  },
  computed: {
    categoryCount() {
      return this.categories.length;
    }
  },
  methods: {
    async fetchCategories() {
      try {
        let _ = await psgAPI.fetchCategoryWithCount();
        _.sort((a, b) => {
          if (a.count > b.count) return -1;
          if (a.count < b.count) return 1;
          return 0;
        });
        this.categories = _;
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
    margin: 0 0 2rem;
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

.category-item {
  @extend %item;
}
</style>


