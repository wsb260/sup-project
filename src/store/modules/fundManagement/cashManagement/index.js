import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
export default {
  namespaced: true,
  state: {
    popupLoading: false,
    showEdit: false,
    pageWait: false,
    showDelete: false,
    saveSuccess: false,
    byIdData: {},
    tableData: [],
    auditTableData: [],
    tableLoading: false,
    auditTotal: 0,
    total: 0,
    auditCurrent: 1,
    current: 1,
    auditPage_size: 10,
    page_size: 10,
    searchData: {
      searchName: "",
      createDate: "",
      sendType: 0
    },
    auditSearchData: {
      searchName: "",
      createDate: "",
      sendType: 0
    }
  },
  mutations: mutations, //mutations END
  actions: actions, //action END
  getters: getters
};
