import Vue from "vue";
import Router from "vue-router";

import Passage from "@/vendor/passage";

const psgAPI = new Passage();

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home"),
      meta: {
        title: "董沅鑫的个人网站"
      }
    },
    {
      path: "/blog/:page",
      name: "blog",
      component: () => import("@/views/Blog")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/Search")
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
        title: "友链 - GODBMW"
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About"),
      meta: {
        title: "关于 - GODBMW"
      }
    },
    {
      path: "/archive",
      name: "archive",
      component: () => import("@/views/Archive"),
      meta: {
        title: "分类与标签 - GODBMW"
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
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.hash) {
    return {
      selector: to.hash
    };
  }
  if (to.meta.title) {
    document.title = to.meta.title;
    return next();
  }
  if (to.name === "search") {
    if (to.query.hasOwnProperty("category")) {
      document.title = "分类:" + to.query.category + " - GODBMW";
    } else if (to.query.hasOwnProperty("tag")) {
      document.title = "标签:" + to.query.tag + " - GODBMW";
    } else if (to.query.hasOwnProperty("time")) {
      document.title = "发布时间:" + to.query.time + " - GODBMW";
    } else {
      return next({
        name: "home"
      });
    }
    return next();
  } else if (to.name === "blog") {
    document.title = "第" + to.params.page + "页 - GODBMW";
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
          document.title = res.title + " - GODBMW";
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
