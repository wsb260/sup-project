import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
export default {
  namespaced: true,
  state: {
    popupLoading: false,
    showEdit: false,
    pageWait: false,
    searchType: false,
    byIdData: {},
    tableData: [],
    tableLoading: false,
    total: 0,
    current: 1,
    page_size: 10,
    searchData: {
      searchName: ""
    },
    rechargeTableData: {
      tableData: [],
      total: 0,
      current: 1,
      page_size: 10,
      searchType: false,
      searchData: {
        searchName: ""
      }
    }
  },
  mutations: mutations, //mutations END
  actions: actions, //action END
  getters: getters
};
