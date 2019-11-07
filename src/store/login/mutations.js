import { makeData, makeSelectOptions } from "tool/tool.js";
export default {
  logined(state, payload) {
    //记录登陆状态
    state.logined = payload || false;
  },
  changeUserInfo(state, payload) {
    //记录登陆状态
    state.userInfo = payload || {};
  },
  changeShow(state, payload) {
    state.changeShow = payload;
  },
  pageTab(state, payload) {
    state.pageTab = payload;
  },
  back(state, payload) {
    state.back = payload;
  },
  changeLogin(state, payload) {
    state.Authorization = payload.Authorization;
  }
};
