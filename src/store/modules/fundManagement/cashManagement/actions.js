import axios from "axios";
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
  auditRefreshData({ dispatch, commit, state }, option) {
    if (option) {
      option = {
        current: option.current ? option.current : state.auditCurrent,
        pageSize: option.pageSize ? option.pageSize : state.auditPageSize,
        searchType: option.searchType
          ? option.searchType
          : state.auditSearchType
      };
      commit("changeCurrent", option.current);
      commit("changePageSize", option.pageSize);
      commit("changeSearchType", option.searchType);
    }
    dispatch({
      type: "getAuditData",
      worked: "table"
    });
  },
  getData({ dispatch, commit, state }, option) {
    commit("changeTableLoading", true);
    axios(this.getters["cashManagement/getData"]())
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
  getAuditData({ dispatch, commit, state }, option) {
    commit("changeTableLoading", true);
    axios(this.getters["cashManagement/getAuditData"]())
      .then(res => {
        if (res && res.data.code == 200) {
          option.data = res.data.data;
          commit("getAuditData", option);
          commit("changeAuditTotal", parseInt(res.data.total, 10) || 0);
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
    axios(this.getters["cashManagement/getByIdData"](option))
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
  agree({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["cashManagement/agree"](option))
      .then(res => {
        if (res && res.data.code == 200) {
          _this.commit("notice/saveSuccess", "操作成功！");
        } else {
          _this.commit("notice/dataError", res.data.message);
        }
      })
      .catch(error => {
        commit("changePopupLoading", false);
      });
  },
  refuse({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["cashManagement/refuse"](option))
      .then(res => {
        if (res && res.data.code == 200) {
          _this.commit("notice/saveSuccess", "操作成功！");
        } else {
          _this.commit("notice/dataError", res.data.message);
        }
      })
      .catch(error => {
        commit("changePopupLoading", false);
      });
  },
  delete({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["cashManagement/delete"](option))
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
