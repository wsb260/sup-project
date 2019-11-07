export default {
  changePopupLoading(state, payload) {
    state.popupLoading = payload;
  },
  changeShowEdit(state, payload) {
    state.showEdit = payload;
  },
  changeShowCheck(state, payload) {
    state.showCheck = payload;
  },
  changePageWait(state, payload) {
    state.pageWait = payload;
  },
  getData(state, payload) {
    if (payload.worked == "table") {
      state.tableData = payload.data;
    }
  },
  getRechargeData(state, payload) {
    if (payload.worked == "table") {
      state.rechargeTableData.tableData = payload.data;
    }
  },
  changeTableLoading(state, payload) {
    state.tableLoading = payload;
  },
  changeTotal(state, payload) {
    state.total = payload;
  },
  changeRechargeTotal(state, payload) {
    state.rechargeTableData.total = payload;
  },
  changeCurrent(state, payload) {
    if (payload && payload != state.current) {
      state.current = payload;
    }
  },
  changeRechargeCurrent(state, payload) {
    if (payload && payload != state.rechargeTableData.current) {
      state.rechargeTableData.current = payload;
    }
  },
  changePageSize(state, payload) {
    if (payload && payload != state.page_size) {
      state.page_size = payload;
    }
  },
  changeRechargePageSize(state, payload) {
    if (payload && payload != state.rechargeTableData.page_size) {
      state.rechargeTableData.page_size = payload;
    }
  },
  changeSearchType(state, payload) {
    state.searchType = payload;
  },
  changeRechargeSearchType(state, payload) {
    state.rechargeTableData.searchType = payload;
  },
  isNewData(state, payload) {
    state.byIdData = {};
  }
};
