import { stat } from "fs";

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
  articleEdit(state, payload) {
    state.editId = payload;
  },
  getData(state, payload) {
    if (payload.worked == "table") {
      state.tableData = payload.data;
    }
  },
  getByIdData(state, payload) {
    state.byIdData = payload.data.data;
  },
  sendUserList(state, payload) {
    let arr = [];
    payload.data.data.forEach(e => {
      arr.push({ value: e.id, label: e.username, userType: e.userType });
    });
    state.sendUserList = arr;
  },
  changeTableLoading(state, payload) {
    state.tableLoading = payload;
  },
  changeTotal(state, payload) {
    state.total = payload;
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
