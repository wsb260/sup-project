import axios from "axios";
export default {
  login({ dispatch, commit, state, rootState }, option) {
    return new Promise((resolve, reject) => {
      let _this = this;
      // axios(this.getters["login/getData"](option))
      axios({
        method: "post",
        url: "http://sup.estxy.com/easysys/sign/sign-in",
        data: {
          username: option.data.username,
          password: option.data.password
        }
      })
        .then(res => {
          if (res && res.data.code == 1000 && res.data.data != null) {
            commit("logined", true);
            _this.commit("index/addToken", res.data.data);
            _this.dispatch("mainMenu/getData");
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(function(error) {
          log(error);
          resolve(false);
        });
    });
  },
  changePassword({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["login/changePassword"](option))
      .then(res => {
        _this
          .dispatch("login/errorLogin", res.data)
          .then(type => {
            if (res && res.data.code == 1000) {
              _this.commit("notice/changePasswordSuccess", res.data.message);
              commit("changeShow", false);
              commit("back", true);
            } else {
              _this.commit("notice/changePasswordError", res.data.message);
            }
          })
          .catch(error => {});
      })
      .catch(error => {
        commit("changeTableLoading", false);
      });
  },
  sendCode({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["articleRotation/sendCode"](option))
      .then(res => {
        if (res && res.data.code == 1000) {
          _this.commit("notice/showSuccess", res.data.message);
        } else {
          _this.commit("notice/showError", res.data.message);
        }
      })
      .catch(error => {
        commit("changeTableLoading", false);
      });
  },
  loginOut({ dispatch, commit, state, rootState }, option) {
    return new Promise((resolve, reject) => {
      this.commit("index/removeToken");
      resolve();
    });
  },
  errorLogin({ dispatch, commit, state, rootState }, option) {
    return new Promise((resolve, reject) => {
      if (option.errorcode == 10001 && option.success == "false") {
        dispatch("clearLogin");
        reject();
      }
      resolve();
    });
  }
};
