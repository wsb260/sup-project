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
    axios(this.getters["lhmanagement/getData"]())
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
    axios(this.getters["lhmanagement/getByIdData"](option))
      .then(res => {
        if (res && res.data.code == 1000) {
          option.data = res.data;
          commit("getByIdData", option);
        } else {
          _this.commit("notice/dataError", res.data.message);
        }
      })
      .catch(error => {
        commit("changePopupLoading", false);
      });
  },
  recovery({ dispatch, commit, state }, option) {
    let _this = this;
    axios(this.getters["lhmanagement/recovery"](option))
      .then(res => {
        if (res.data.code == 200) {
          _this.commit("notice/saveSuccess");
        }
      })
      .catch(function(error) {
        _this.commit("notice/saveError", error);
      });
  },
  sellOut({ dispatch, commit, state }, option) {
    let _this = this;
    axios(this.getters["lhmanagement/sellOut"](option))
      .then(res => {
        if (res.data.code == 200) {
          _this.commit("notice/saveSuccess");
        }
      })
      .catch(function(error) {
        _this.commit("notice/saveError", error);
      });
  },
  delete({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["lhmanagement/delete"](option))
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
