import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
export default {
  namespaced: true,
  state: {
    logined: false, //登录状态
    userInfo: {},
    Authorization: "",
    changeShow: false,
    back: false,
    pageTab: false
  },
  mutations: mutations, //mutations END
  actions: actions, //action END
  getters: getters
};
