<template>
  <header>
    <div class="site-brand">
      <div class="site-title">
        <a href="/">GODBMW.com</a>
      </div>
      <!-- <p class="site-description">目光露着温暖，心间藏着想念</p> -->
    </div>
    <nav class="site-navigation">
      <ul class="nav-menu">
        <li class="nav-item" v-for="(link, index) in insiteNavigations" :key="index" @mouseover="checkedItemIndex = index" @mouseleave="checkedItemIndex = -1" >
          <router-link :to="link.path">{{ link.name }}</router-link>
          <ul class="nav-menu--dropdown" :class="{active: checkedItemIndex === index}">
            <li>
              <router-link :to="link.path">{{ link.name }}</router-link>
            </li>
            <li>
              <router-link :to="link.path">{{ link.name }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      checkedItemIndex: -1,
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
          name: "分类",
          path: "/category"
        },
        {
          name: "标签",
          path: "/tag"
        },
        {
          name: "友链",
          path: "/friend"
        },
        {
          name: "关于",
          path: "/about"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
header {
  display: block;
  position: fixed;
  left: 50%;
  top: 0;
  right: 0;
  z-index: 900;
  width: 100vw;
  box-shadow: 0 5px 4px -4px rgba(25, 25, 25, 0.1);
  color: #888;
  background: white;
  transform: translateX(-50%);

  .site-brand {
    float: left;
    height: 54px;
    padding-left: 40px;
  }

  .site-navigation {
    float: right;
    height: 54px;
    padding-right: 40px;
  }

  &::after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

.site-brand {
  text-align: center;
  transition: all 0.1s linear;
  line-height: 54px;
  position: relative;

  .site-title {
    margin: 0;
    font-size: 2rem;
    transition: all 0.1s linear;
    a {
      transition: all 0.1s linear;
      display: inline-block;
      color: #222;
      font-weight: 333;
      font-family: "Sakura";
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);

      &:hover {
        color: rgb(240, 56, 56);
        text-shadow: 1px 1px 1px rgba(240, 56, 56, 0.3);
      }
    }
  }

  .site-description {
    position: absolute;
    bottom: 0;
    left: 0;
    text-transform: uppercase;
    color: #9e9e9e;
    font-size: 1rem;
  }
}

.site-navigation {
  text-align: center;
  height: 54px;
  line-height: 54px;

  ul.nav-menu {
    list-style: none;
    font-size: 1.6em;
    display: block;

    li.nav-item {
      display: inline-block;
      margin: 0 1.5rem;
      position: relative;

      a {
        display: block;
        transition: all 0.1s linear;
        color: #888;

        &:hover {
          color: #222;
        }
      }
    }
  }

  ul.nav-menu--dropdown {
    position: absolute;
    top: 53px;
    left: -50%;
    list-style: none;
    text-align: center;
    width: 200%;
    opacity: 0;
    height: 0;
    transition: all 0.15s linear;

    li {
      background: white;
      height: 35px;
      line-height: 35px;
    }
  }

  ul.nav-menu--dropdown.active {
    opacity: 1;
    height: auto;
    box-shadow: 0px 2px 3px rgba(25, 25, 25, 0.1);
  }
}
</style>


