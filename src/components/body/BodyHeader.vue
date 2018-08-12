<template>
  <header>
    <div class="site-brand">
      <h1 class="site-title">
        <a href="/">YuanXin</a>
      </h1>
      <p class="site-description">Code is Poetry</p>
      <p></p>
    </div>
    <nav class="site-navigation">
      <ul>
        <li v-for="(link, index) in insiteNavigations" :key="index">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
        <li v-for="(link, index) in outsizeNavigations" :key="index+insiteNavigations.length">
          <a :href="link.href" target="_blank">{{ link.name }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      insiteNavigations: [
        {
          name: "主页",
          path: "/"
        },
        {
          name: "归档",
          path: "/archive"
        },
        {
          name: "友链",
          path: "/friend"
        }
      ],
      outsizeNavigations: [
        {
          name: "知乎",
          href: "https://www.zhihu.com/people/godbmw/activities"
        },
        {
          name: "GITHUB",
          href: "https://github.com/dongyuanxin"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
header {
  line-height: 1.8rem;
  display: block;
}
nav {
  display: block;
}
.site-brand {
  text-align: center;
  margin-bottom: 2rem;
  font-family: "Open Sans", arial, sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;

  .site-title {
    margin: 0;
    font-size: 1.4rem;
    a {
      display: inline-block;
      color: #fff;
      font-weight: bolder;
      background-color: #f03838;
      line-height: 3rem;
      height: 3rem;
      padding: 0 1rem;
      transition: padding 0.3s ease-out;
    }
    a:hover {
      padding: 0 1.5rem;
    }
  }

  .site-description {
    color: #9e9e9e;
    font-size: 1.3rem;
    margin: 1rem 0 0;
  }
}
.site-navigation {
  text-align: center;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.6em;
    display: block;

    li {
      display: inline-block;
      margin: 0 0.5rem;

      a {
        display: block;
        color: #f03838;
        font-size: 1.6rem;
        line-height: 2rem;
        padding: 0 1rem;
      }
    }
  }
}
</style>


