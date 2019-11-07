import axios from "axios";
export default {
  saveData({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["apply/saveData"]())
      .then(res => {
        _this
          .dispatch("login/errorLogin", res.data)
          .then(type => {
            if (res.data.code == 1000) {
              commit("successData", true);
              alert(res.data.message);
            } else {
              alert(res.data.message);
            }
          })
          .catch(error => {});
      })
      .catch(function(error) {
        _this.commit("notice/saveError", error);
      });
  },
  sendCode({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["apply/sendCode"](option))
      .then(res => {
        if (res.data.code == 1000) {
          alert("验证码已发送至您的邮箱！");
          _this.commit("notice/sendCodeSuccess");
        } else {
          alert(res.data.message);
          _this.commit("notice/sendCodeError", res.data.message);
        }
      })
      .catch(function(error) {
        _this.commit("notice/sendCodeError", error);
      });
  },
  industryTypes({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["apply/industryTypes"]())
      .then(res => {
        if (res.data.code == 1000) {
          option.data = res.data.data;
          commit("industryTypes", option);
        }
      })
      .catch(function(error) {
        _this.commit("notice/saveError", error);
      });
  },
  proviceData({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["apply/proviceData"](option))
      .then(res => {
        if (res.data.code == 1000) {
          option.data = res.data.data;
          if (typeof option.val === "number") {
            commit("cityData", option);
          } else {
            commit("proviceData", option);
          }
        }
      })
      .catch(function(error) {});
  },
  dictList({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["apply/dictList"](option))
      .then(res => {
        if (res.data.code == 1000) {
          option.data = res.data.data;
          commit("dictList", option);
        }
      })
      .catch(function(error) {
        _this.commit("notice/saveError", error);
      });
  },
  verifyEmail({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["apply/verifyEmail"](option))
      .then(res => {
        _this
          .dispatch("login/errorLogin", res.data)
          .then(type => {
            if (res.data.code == 1000) {
              alert("邮箱验证码验证成功！");
              commit("changeUserInfo", true);
              _this.commit("notice/sendCodeSuccess");
            } else {
              alert(res.data.message);
              _this.commit("notice/sendCodeError", res.data.message);
            }
          })
          .catch(error => {});
      })
      .catch(function(error) {
        _this.commit("notice/sendCodeError", error);
      });
  }
};
