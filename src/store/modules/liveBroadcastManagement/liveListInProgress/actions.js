import axios from "axios";
import router from "../../../../router/index";
export default {
  refreshData({ dispatch, commit, state }, option) {
    if (option) {
      option = {
        current: option.current ? option.current : state.current,
        pageSize: option.pageSize ? option.pageSize : state.pageSize,
        searchType: option.searchType ? option.searchType : state.searchType
      };
      commit("changeCurrent", option.current);
      commit("changePageSize", option.pageSize);
      commit("changeSearchType", option.searchType);
    }
    dispatch({
      type: "getData",
      worked: "table"
    });
  },
  getData({ dispatch, commit, state }, option) {
    commit("changeTableLoading", true);
    axios(this.getters["classifiedManagement/getData"]())
      .then(res => {
        if (res && res.data.code == 200) {
          option.data = res.data.data;
          commit("getData", option);
          commit("changeTotal", parseInt(res.data.total, 10) || 0);
        } else {
        }
        commit("changeTableLoading", false);
      })
      .catch(error => {
        commit("changeTableLoading", false);
      });
  },
  getByIdData({ dispatch, commit, state }, option) {
    var _this = this;
    commit("isNewData");
    axios(this.getters["classifiedManagement/getByIdData"](option))
      .then(res => {
        _this
          .dispatch("login/errorLogin", res.data)
          .then(type => {
            if (res && res.data.code == 1000) {
              option.data = res.data;
              commit("getByIdData", option);
            } else {
              _this.commit("notice/dataError", res.data.message);
            }
          })
          .catch(error => {});
      })
      .catch(error => {
        commit("changePopupLoading", false);
      });
  },
  saveData({ dispatch, commit, state }, option) {
    var _this = this;
    commit("changePopupLoading", true);
    axios(
      this.getters[
        option.id
          ? "classifiedManagement/saveEdit"
          : "classifiedManagement/saveNew"
      ](option)
    )
      .then(res => {
        if (res.data.code == 1000) {
          _this.commit("notice/saveSuccess");
          _this.commit("pageTab/removeTabs", { name: "addArticle" });
          router.push("/classifiedManagement");
          dispatch({ type: "refreshData" });
        } else {
          _this.commit("notice/saveError", res.data.message);
        }
        commit("changePopupLoading", false);
      })
      .catch(function(error) {
        _this.commit("notice/saveError", error);
        commit("changePopupLoading", false);
      });
  },
  sendUserList({ dispatch, commit, state }, option) {
    axios(this.getters["classifiedManagement/sendUserList"](option))
      .then(res => {
        if (res.data.code == 1000) {
          option.data = res.data;
          commit("sendUserList", option);
          commit("changeUser", option);
        }
      })
      .catch(function(error) {});
  },
  updateFileState({ dispatch, commit, state }, option) {
    axios(this.getters["classifiedManagement/updateFileState"](option))
      .then(res => {
        if (res.data.code == 1000) {
          dispatch({ type: "refreshData" });
        }
      })
      .catch(function(error) {});
  },
  upLoad({ dispatch, commit, state }, option) {
    axios(this.getters["classifiedManagement/upLoad"](option))
      .then(res => {
        if (res.data.code == 1000) {
          dispatch({ type: "refreshData" });
        }
      })
      .catch(function(error) {});
  },
  delete({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["classifiedManagement/delete"](option))
      .then(res => {
        _this
          .dispatch("login/errorLogin", res.data)
          .then(type => {
            if (res.data.code == 1000) {
              _this.commit("notice/delSuccess");
              dispatch({ type: "refreshData" });
            } else {
              _this.commit("notice/delError", res.data.message);
            }
          })
          .catch(error => {});
      })
      .catch(function(error) {
        _this.commit("notice/delError", error);
      });
  }
};
