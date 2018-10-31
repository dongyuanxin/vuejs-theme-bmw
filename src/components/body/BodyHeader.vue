<template>
  <div class="header-wrap">
    <header>
      <div class="site-brand">
        <div class="site-title">
          <router-link to="/">GODBMW.com</router-link>
        </div>
      </div>
      <nav :class="{'site-navigation':true, 'active': showMobileNav}">
        <ul class="nav-menu">
          <li class="nav-item" v-for="(link, index) in insiteNavigations" :key="index" 
          @mouseenter="checkedItemIndex = index"
          @mouseleave="checkedItemIndex = -1" >
            <router-link :to="link.path" v-if="link.children.length === 0">{{ link.name }}</router-link>
            <a href="javascript:void(0);" v-else>{{link.name}}</a>
            <ul class="nav-menu--dropdown" :class="{active: checkedItemIndex === index}" v-if="link.children.length !== 0">
              <li v-for="(childrenLink, childrenIndex) in link.children" :key="childrenIndex">
                <router-link :to="childrenLink.path" v-if="childrenLink.blank === false">{{ childrenLink.name }}</router-link>
                <a :href="childrenLink.path" target="_blank" v-else>{{childrenLink.name}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <i class="iconfont icon-menu" @click="showMobileNav = !showMobileNav"></i>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedItemIndex: -1,
      showMobileNav: false,
      insiteNavigations: [
        {
          name: "主页",
          path: "/",
          blank: false,
          children: []
        },
        {
          name: "教程",
          path: "",
          blank: true,
          children: [
            {
              name: "Webpack4 系列",
              path: "/category/webpack4%20系列教程",
              blank: false
            },
            {
              name: "每天一个设计模式",
              path: "/category/每天一个设计模式",
              blank: false
            }
          ]
        },
        {
          name: "归档",
          path: "/archive",
          blank: false,
          children: []
        },
        {
          name: "分类",
          path: "/category",
          blank: false,
          children: []
        },
        {
          name: "标签",
          path: "/tag",
          blank: false,
          children: []
        },
        {
          name: "友链",
          path: "/friend",
          blank: false,
          children: []
        },
        {
          name: "关于",
          path: "/about",
          blank: false,
          children: []
        },
        {
          name: "开源",
          path: "",
          blank: true,
          children: [
            {
              name: "多平台音乐API",
              path: "https://github.com/dongyuanxin",
              blank: true
            },
            {
              name: "Webpack4 源码",
              path: "https://github.com/dongyuanxin/webpack-demos",
              blank: true
            },
            {
              name: "金融情感模型",
              path: "https://github.com/dongyuanxin/news-emotion",
              blank: true
            },
            {
              name: "ONE BOOK",
              path: "https://github.com/dongyuanxin/onebook",
              blank: true
            }
          ]
        },
        {
          name: "抓到我",
          path: "",
          blank: true,
          children: [
            {
              name: "GitHub",
              path: "https://github.com/dongyuanxin",
              blank: true
            },
            {
              name: "SegmentFault",
              path: "https://segmentfault.com/u/godbmw",
              blank: true
            },
            {
              name: "知乎",
              path: "https://www.zhihu.com/people/godbmw/activities",
              blank: true
            },
            {
              name: "掘金",
              path: "https://juejin.im/user/5b91fcf06fb9a05d3c7fd4a5",
              blank: true
            },
            {
              name: "简书",
              path: "https://www.jianshu.com/u/d1570f4a618a",
              blank: true
            }
          ]
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.checkedItemIndex = -1
      this.showMobileNav = false
    }
  }
};
</script>

<style lang="scss" scoped>
.header-wrap {
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 900;
  width: calc(100vw + 15px);
  box-shadow: 0 5px 4px -4px rgba(25, 25, 25, 0.1);
  color: #888;
  background: white;
}

header {
  display: block;
  width: 960px;
  margin: 0 auto;
  .site-brand {
    float: left;
    height: 54px;
  }

  .site-navigation {
    float: right;
    height: 54px;
  }

  &::after {
    content: " ";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .iconfont.icon-menu {
    display: none;  
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
      color: #000;
      font-weight: 333;
      font-family: "Sakura";
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    }
  }
}

.site-navigation {
  text-align: center;
  height: 54px;
  line-height: 54px;

  ul.nav-menu {
    list-style: none;
    font-size: 1.4em;
    display: block;

    li.nav-item {
      display: inline-block;
      margin: 0 1.4rem;
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
    left: 50%;
    list-style: none;
    text-align: center;
    transform: translateX(-50%);
    overflow: hidden;
    width: 0;
    transition: all 0.05s linear;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;

    li {
      background: white;
      height: 35px;
      line-height: 35px;
    }
  }

  ul.nav-menu--dropdown.active {
    width: 130px;
    box-shadow: 0px 2px 3px rgba(25, 25, 25, 0.1);
  }
}

@media (max-width: 960px) {
  .header-wrap {
    width: 100vw;
  }
  header {
    width: 100%;
    .site-brand {
      padding-left: 1rem;
    }
    .site-navigation {
      padding-right: 1rem;
    }
  }
}

@media (max-width: 767px) {
  header {
    position: relative;
    .site-brand {
      float: left;
      display: block;
      height: 54px;
    }

    .site-navigation {
      clear:both;
      float: none;
      height: 0;
      overflow-y: auto;
      position: fixed;
      z-index: 900;
      top: 54px;
      left: 0;
      width: 100vw;
      background: white;
      transition: height .1s linear;
    }

    .site-navigation.active {
      height: calc(100vh - 54px);
    }

    .iconfont.icon-menu {
      display: inline;
      position: absolute;
      right : 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 3rem;
      color: #333;
    }
  }

  .site-navigation {
    text-align: left;
    height: 40px;
    line-height: 40px;

    ul.nav-menu {
      list-style: none;
      font-size: 1.4em;
      display: block;

      li.nav-item {
        display: block;
        margin: 0 1.4rem;
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
      position: static;
      list-style: none;
      text-align: left;
      transform: translateX(0);
      overflow: hidden;
      transition: all 0.05s linear;
      border: none;
      box-shadow: none;
      display: none;

      li {
        margin-left: 20px;
        height: 35px;
        line-height: 35px;
        margin-top: -1px
      }
    }

    ul.nav-menu--dropdown.active {
      display: block;
      box-shadow: none;
    }
  }
}
</style>


