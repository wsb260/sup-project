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
  awardRefreshData({ dispatch, commit, state }, option) {
    if (option) {
      option = {
        current: option.current ? option.current : state.awardTableData.current,
        pageSize: option.pageSize
          ? option.pageSize
          : state.awardTableData.page_size,
        searchType: option.searchType
          ? option.searchType
          : state.awardTableData.searchType
      };
      commit("changeRechargeCurrent", option.current);
      commit("changeRechargePageSize", option.pageSize);
      commit("changeRechargeSearchType", option.searchType);
    }
    dispatch({
      type: "getRechargeData",
      worked: "table"
    });
  },
  awardRefreshData({ dispatch, commit, state }, option) {
    if (option) {
      option = {
        current: option.current ? option.current : state.awardTableData.current,
        pageSize: option.pageSize
          ? option.pageSize
          : state.awardTableData.page_size,
        searchType: option.searchType
          ? option.searchType
          : state.awardTableData.searchType
      };
      commit("changeRechargeCurrent", option.current);
      commit("changeRechargePageSize", option.pageSize);
      commit("changeRechargeSearchType", option.searchType);
    }
    dispatch({
      type: "getRechargeData",
      worked: "table"
    });
  },
  getData({ dispatch, commit, state }, option) {
    commit("changeTableLoading", true);
    axios(this.getters["normalUser/getData"]())
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
  getRechargeData({ dispatch, commit, state }, option) {
    commit("changeTableLoading", true);
    axios(this.getters["normalUser/getRechargeData"]())
      .then(res => {
        console.log(res);
        if (res && res.data.code == 200) {
          option.data = res.data.data;
          commit("getRechargeData", option);
          commit("changeRechargeTotal", parseInt(res.data.total, 10) || 0);
        } else {
        }
        commit("changeTableLoading", false);
      })
      .catch(error => {
        commit("changeTableLoading", false);
      });
  },
  getAwardData({ dispatch, commit, state }, option) {
    commit("changeTableLoading", true);
    axios(this.getters["normalUser/getAwardData"]())
      .then(res => {
        console.log(res);
        if (res && res.data.code == 200) {
          option.data = res.data.data;
          commit("getAwardData", option);
          commit("changeRechargeTotal", parseInt(res.data.total, 10) || 0);
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
    axios(this.getters["normalUser/getByIdData"](option))
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
  delete({ dispatch, commit, state }, option) {
    var _this = this;
    axios(this.getters["normalUser/delete"](option))
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
