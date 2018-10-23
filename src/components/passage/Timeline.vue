<template>
  <div class="timeline">
    <span class="archive-move-on"></span>
    <span class="archive-page-counter">
      <slot name="meta"></slot>
    </span>
    <div class="collection-title">
      <h2>
        <slot name="title"></slot>
      </h2>
    </div>
    <article class="posts-collapse" v-for="(psg, index) in passages" :key="index">
      <header>
        <h2>
          <router-link :to = "'/passage/' + psg.id">
            <span>{{ psg.title }}</span>
          </router-link>
        </h2>
        <div class="post-meta">
          {{ psg.createTime.substr(5,5)}}
        </div>
      </header>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    passages: {
      type: Array,
      required: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .timeline {
    margin-left: 10px !important;
  }
}

.timeline {
  position: relative;
  border-left: 4px solid #f5f5f5;
  margin-left: 50px;
  margin-top: 5px;
  .archive-move-on {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: -8px;
    width: 10px;
    height: 10px;
    opacity: 0.5;
    background: #555;
    border: 1px solid #fff;
    border-radius: 50%;
  }

  .archive-page-counter {
    position: relative;
    top: -4px;
    left: 20px;
  }

  .collection-title {
    position: relative;
    margin: 60px 0;

    h2 {
      margin-left: 20px;
    }

    &::before {
      content: " ";
      position: absolute;
      left: 0;
      top: 50%;
      margin-left: -6px;
      margin-top: -4px;
      width: 8px;
      height: 8px;
      background: #bbb;
      border-radius: 50%;
    }
  }

  .posts-collapse {
    margin: 30px 0;
    position: relative;
    border-bottom: 1px dashed #ccc;
    transition: all 0.15s linear;

    &::before {
      transition: all 0.15s linear;
      content: " ";
      position: absolute;
      top: 8px;
      width: 6px;
      height: 6px;
      left: 0;
      margin-left: -6px;
      border: 1px solid #fff;
      background: #bbb;
      border-radius: 50%;
    }

    h2 {
      margin: 20px 0 15px;
      margin-left: 60px;
      font-size: 16px;
      font-weight: 400;
      line-height: inherit;

      a {
        color: #666;
        border-bottom: none;
      }
    }

    .post-meta {
      position: absolute;
      font-size: 12px;
      left: 20px;
      top: 5px;
    }

    &:hover {
      border-bottom-color: #fc6868;
      &::before {
        background: #fc6868;
      }
      h2 {
        a {
          color: #222;
        }
      }
    }
  }
}
</style>
