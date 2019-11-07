import api from "controller/api/api.js";
import axios from "axios";
export default {
  namespaced: true,
  state: {
    Authorization: localStorage.getItem("Authorization")
      ? localStorage.getItem("Authorization")
      : ""
  },
  mutations: {
    addToken(state, user) {
      localStorage.setItem("Authorization", user.token);
    },
    removeToken() {
      localStorage.removeItem("Authorization");
    }
  },
  actions: {},
  getters: {}
};
