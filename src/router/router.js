import allPage from "./allPage.js";

export default [
  {
    name: "home",
    path: "/index",
    meta: {
      title: "首页",
      keepAlive: false
    },
    component: () => import("page/index/index.vue"),
    children: allPage
  },
  {
    path: "/login",
    meta: {
      title: "login",
      keepAlive: false
    },
    component: () => import("page/login/login.vue")
  }
  // {
  //   path: "/*",
  //   meta: {
  //     title: "404",
  //     keepAlive: false
  //   },
  //   component: () => import("page/404/404.vue")
  // }
];
