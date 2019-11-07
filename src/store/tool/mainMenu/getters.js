import api from "controller/api/api.js";
export default {
  getData: (state, getters, rootState, rootGetters) => option => {
    return {
      method: api.mainMenu.method,
      url: api.mainMenu.url
    };
  }
};
