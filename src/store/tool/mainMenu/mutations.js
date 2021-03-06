import { adjustMenu } from "./tool.js";
export default {
  changeMainMenu(state, payload) {
    state.menu = payload;
    state.mainMenu = adjustMenu(payload);
  },
  clickMenu(state, payload) {
    state.mainMenu.forEach((v, i) => {
      let f = false;
      f = v.modulename == payload;
      if (v.seconds && v.seconds.length > 0) {
        v.seconds.forEach((v2, i2) => {
          v2.cur = (v2.modulename == payload);
          f = f || v2.cur;
        });
      }
      v.cur = f;
    });
  },
  clearAll(state, payload) {
    state.mainMenu.forEach((v, i) => {
      v.cur = false;
      if (v.seconds && v.seconds.length > 0) {
        v.seconds.forEach((v2, i2) => {
          v2.cur = false;
        });
      }
    });
  }
};
