import { makeData, makeSelectOptions } from "tool/tool.js";
export default {
  logined(state, payload) {
    //记录登陆状态
    state.logined = payload || false;
  },
  changeUserInfo(state, payload) {
    state.userInfo = payload;
  },
  successData(state, payload) {
    state.successData = payload;
  },
  dictList(state, payload) {
    let arr = [];
    payload.data.forEach(e => {
      arr.push({ value: e.id, label: e.name })
    })
    state.dictList = arr;
  },
  cityData(state, payload) {
    let arr = [];
    payload.data.forEach(e => {
      arr.push({ value: e.id, label: e.cityName });
    });
    state.cityData = arr;
  },
  proviceData(state, payload) {
    let arr = [];
    payload.data.forEach(e => {
      arr.push({ value: e.id, label: e.cityName });
    });
    state.proviceData = arr;
  },
  industryTypes(state, payload) {
    let arr = [];
    payload.data.forEach(e => {
      arr.push({ value: e.id, label: e.name });
    });
    state.industryTypes = arr;
  },
  changeLogin(state, payload) {
    state.Authorization = payload.Authorization;
  }
};
