import Vue from "vue";
import Router from "vue-router";

import Passage from "@/vendor/passage";

const psgAPI = new Passage();
const tailTitle = " - 董沅鑫的个人网站";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home"),
      meta: {
        title: "首页" + tailTitle
      }
    },
    {
      path: "/blog/:page",
      name: "blog",
      component: () => import("@/views/Blog")
    },
    {
      path: "/passage/:id",
      name: "passage",
      component: () => import("@/views/Passage")
    },
    {
      path: "/friend",
      name: "friend",
      component: () => import("@/views/Friend"),
      meta: {
        title: "友链" + tailTitle
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About"),
      meta: {
        title: "关于" + tailTitle
      }
    },
    {
      path: "/archive",
      name: "archive",
      component: () => import("@/views/Archive/Index"),
      meta: {
        title: "归档" + tailTitle
      }
    },
    {
      path: "/archive/:time",
      name: "archive-detail",
      component: () => import("@/views/Archive/Detail"),
      meta: {
        title: "归档" + tailTitle
      }
    },
    {
      path: "/category",
      name: "category",
      component: () => import("@/views/Category/Index"),
      meta: {
        title: "分类" + tailTitle
      }
    },
    {
      path: "/category/:category",
      name: "category-detail",
      component: () => import("@/views/Category/Detail")
    },
    {
      path: "/tag/:tag",
      name: "tag-detail",
      component: () => import("@/views/Tag/Detail")
    },
    {
      path: "/tag",
      name: "tag",
      component: () => import("@/views/Tag/Index"),
      meta: {
        title: "标签" + tailTitle
      }
    },
    {
      path: "*",
      name: "error",
      redirect: "/"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      let position = {};
      if (to.hash) {
        position.selector = to.hash;
      } else {
        position.x = 0;
        position.y = 0;
      }
      return position;
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.path == from.path && to.hash) {
    return { selector: to.hash };
  }
  if (to.meta.title) {
    document.title = to.meta.title;
    return next();
  }

  if (to.name === "category-detail") {
    document.title = "分类 : " + to.params.category + tailTitle;
    return next();
  } else if (to.name === "tag-detail") {
    document.title = "标签 : " + to.params.tag + tailTitle;
    return next();
  } else if (to.name === "blog") {
    document.title = "第" + to.params.page + "页" + tailTitle;
    return next();
  } else if (to.name === "passage") {
    psgAPI
      .search({
        id: to.params.id,
        isTitle: true,
        isScan: false
      })
      .then(res => {
        if (res.hasOwnProperty("title") && res.title.length > 0) {
          document.title = res.title + tailTitle;
          return next();
        }
        return next({ name: "home" });
      })
      .catch(err => {
        return next({ name: "home" });
      });
  } else {
    return next();
  }
});

export default router;
