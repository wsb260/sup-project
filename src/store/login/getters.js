import { makeAjaxUrl } from "tool/tool.js";
import md5 from "js-md5";
import api from "controller/api/api.js";
const apiInfo = api.login;
export default {
  getData: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.login.method,
      url: apiInfo.login.url,
      data: {
        username: option.data.username,
        passWord: option.data.password
      }
      // verifyCode: option.data.coding,
    };
  },
  changePassword: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.changePassword.method,
      url: apiInfo.changePassword.url,
      data: {
        password: option.password,
        oldPassword: option.oldPassword,
        updateType: 5
      }
    };
  },
  sendCode: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.sendCode.method,
      url: apiInfo.sendCode.url
    };
  },
  loginOut: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.loginOut.method,
      url: apiInfo.loginOut.url
    };
  }
};
