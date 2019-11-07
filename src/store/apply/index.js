import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
export default {
  namespaced: true,
  state: {
    byIdData: {},
    industryTypes: [],
    proviceData: [],
    cityData: [],
    dictList: [],
    userInfo: false,
    successData: false
  },
  mutations: mutations, //mutations END
  actions: actions, //action END
  getters: getters
};
