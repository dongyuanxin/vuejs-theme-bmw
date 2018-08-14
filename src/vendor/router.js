import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home")
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
      component: () => import("@/views/Friend")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/about")
    },
    {
      path: "*",
      name: "error",
      component: () => import("@/views/Home")
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

export default router;
