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
    groupTableData: [],
    tableLoading: false,
    groupTotal: 0,
    total: 0,
    groupCurrent: 1,
    current: 1,
    groupPage_size: 10,
    page_size: 10,
    searchData: {
      searchName: "",
      createDate: "",
      sendType: 0
    },
    groupSearchData: {
      searchName: "",
      createDate: "",
      sendType: 0
    }
  },
  mutations: mutations, //mutations END
  actions: actions, //action END
  getters: getters
};
