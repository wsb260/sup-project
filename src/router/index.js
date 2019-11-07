import Vue from "vue";
import Router from "vue-router";
import routers from "./router.js";
import axios from "axios";
import store from "../../src/store/main";

Vue.use(Router);
const router = new Router({ mode: "history", routes: routers });
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
  } else {
    let token = localStorage.getItem("Authorization");
    if (token === "null" || token === "") {
      next("/login");
    } else if (to.path != "/index") {
      store.commit("login/pageTab", true);
      next();
    } else if (to.path == "/index") {
      store.commit("login/pageTab", false);
      next();
    }
  }
});
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("Authorization")) {
      config.headers.Authorization = localStorage.getItem("Authorization");
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default router;
