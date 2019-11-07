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
  changeShowDelete(state, payload) {
    state.showDelete = payload;
  },
  changePageWait(state, payload) {
    state.pageWait = payload;
  },
  getData(state, payload) {
    if (payload.worked == "table") {
      state.tableData = payload.data;
    }
  },
  getAuditData(state, payload) {
    if (payload.worked == "table") {
      state.auditTableData = payload.data;
    }
  },
  getByIdData(state, payload) {
    state.byIdData = payload.data.data;
  },
  changeTableLoading(state, payload) {
    state.tableLoading = payload;
  },
  changeTotal(state, payload) {
    state.total = payload;
  },
  changeAuditTotal(state, payload) {
    state.auditTotal = payload;
  },
  changeCurrent(state, payload) {
    if (payload && payload != state.current) {
      state.current = payload;
    }
  },
  changePageSize(state, payload) {
    if (payload && payload != state.page_size) {
      state.page_size = payload;
    }
  },
  changeSearchType(state, payload) {
    state.searchType = payload;
  },
  isNewData(state, payload) {
    state.byIdData = {};
  }
};
