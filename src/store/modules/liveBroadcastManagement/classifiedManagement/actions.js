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
    axios(this.getters["liveListInProgress/getData"]())
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
  saveData({ dispatch, commit, state }, option) {
    var _this = this;
    commit("changePopupLoading", true);
    axios(
      this.getters[
        option.id ? "liveListInProgress/saveEdit" : "liveListInProgress/saveNew"
      ](option)
    )
      .then(res => {
        if (res.data.code == 1000) {
          _this.commit("notice/saveSuccess");
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
  delete({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["liveListInProgress/delete"](option))
      .then(res => {
        if (res.data.code == 1000) {
          _this.commit("notice/delSuccess");
          dispatch({ type: "refreshData" });
        } else {
          _this.commit("notice/delError", res.data.message);
        }
      })
      .catch(function(error) {
        _this.commit("notice/delError", error);
      });
  }
};
