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
    giftSearchType: false,
    byIdData: {},
    tableData: [],
    giftTableData: [],
    tableLoading: false,
    total: 0,
    giftTotal: 0,
    current: 1,
    giftCurrent: 1,
    page_size: 10,
    giftPage_size: 10,
    searchData: {
      searchName: "",
      createDate: "",
      sendType: 0
    },
    giftSearchData: {}
  },
  mutations: mutations, //mutations END
  actions: actions, //action END
  getters: getters
};
