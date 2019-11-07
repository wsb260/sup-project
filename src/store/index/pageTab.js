import router from "src/router/router.js";

export default {
  namespaced: true,
  state: {
    tabs: [],
    newPage: "",
    pageNames: []
  },
  mutations: {
    reset(state, payload) {
      state.tabs.forEach((v, i) => {
        if (v.name != "home") {
          commitOther.call(this, v.name);
        }
      });
      state.tabs = [];
      state.tabs = [{ name: "home", path: "/index", title: "首页", cur: true }];
      state.pageNames = [];
    },
    closeOther(state, payload) {
      state.tabs
        .filter(item => !(item.cur || item.name == "home"))
        .forEach((v, i) => {
          commitOther.call(this, v.name);
        });
      state.tabs = state.tabs.filter(item => item.cur || item.name == "home");
      state.pageNames = this.getters["pageTab/makePageNames"]();
    },
    addTabs(state, payload) {
      if (state.tabs.filter(item => item.name == payload).length == 0) {
        state.tabs.push(findInfo(payload));
        state.newPage = payload;
      } else {
        state.newPage = "";
      }
      this.commit("pageTab/changeTabs", payload);
      state.pageNames = this.getters["pageTab/makePageNames"]();
    },
    removeTabs(state, payload) {
      state.tabs = state.tabs.filter(item => item.name != payload.name);
      state.pageNames = this.getters["pageTab/makePageNames"]();
      commitOther.call(this, payload.name);
    },
    changeTabs(state, payload) {
      payload = payload.name || payload;
      state.tabs.forEach((v, i) => {
        v.cur = v.name == payload;
      });
      state.newPage = payload == state.newPage ? state.newPage : "";
    }
  },
  getters: {
    pageInTab: (state, getters, rootState, rootGetters) => option => {
      return option == state.newPage;
      //return state.tabs.filter(item => item.name == option).length == 1;
    },
    hasPageTab: (state, getters, rootState, rootGetters) => option => {
      return state.tabs.filter(item => item.name == option).length == 1;
    },
    makePageNames: (state, getters, rootState, rootGetters) => option => {
      var n = [];
      state.tabs.forEach((v, i) => {
        n.push(v.name);
      });
      return n;
    }
  }
};

const findInfo = (d, obj) => {
  obj = obj || router;
  var info = false;
  if (obj && obj.length > 0) {
    obj.eltForEach((v, i) => {
      if (v.name == d && v.meta) {
        // && v.meta.keepAlive
        info = {
          name: v.name,
          path: v.path || "/",
          title: v.meta.title || "",
          keep: v.meta && v.meta.keepAlive && true,
          cur: true
        };
        return true;
      } else if (v.children && v.children.length > 0) {
        info = findInfo(d, v.children);
      }
    });
  }
  return info;
};

const findRepeat = (d, tabs) => {
  var finded = false;
  if (tabs && tabs.length > 1) {
    tabs.eltForEach((v, i) => {
      if (v.path == d) {
        finded = true;
      }
      return finded;
    });
  }
  return finded;
};

function commitOther(name) {
  var r = router[0].children.filter(item => item.name == name)[0] || false;
  // if (r) {
  //   makes.call(this, { info: "edit", path: "/changeShowEdit" });
  //   makes.call(this, { info: "check", path: "/changeShowCheck" });
  //   makes.call(this, { info: "pageWait", path: "/changePageWait" });
  //   makes.call(this, { info: "popupLoading", path: "/changePopupLoading" });
  // }

  function makes({ info, path }) {
    r.meta[info].type
      ? changeAll.call(this, {
        path:
          r.meta[info].path.length > 0 ? r.meta[info].path : r.meta.allPath,
        ec: path
      })
      : "";
  }

  function changeAll({ path, ec }) {
    path.forEach((v, i) => {
      this.commit(v + ec, false);
    });
  }
}
