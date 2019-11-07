import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";
export default {
  namespaced: true,
  state: {
    popupLoading: false,
    showEdit: false,
    showProhibition: false,
    pageWait: false,
    showDelete: false,
    saveSuccess: false,
    byIdData: {},
    tableData: [],
    sendUserList: [],
    userType: 0,
    userId: 0,
    userName: "",
    fileId: 0,
    stateName: 0,
    attribute: 0,
    rejectionData: {},
    tableLoading: false,
    total: 0,
    current: 1,
    page_size: 10,
    user: "",
    searchData: {
      searchName: "",
      createDate: "",
      sendType: 0
    }
  },
  mutations: mutations, //mutations END
  actions: actions, //action END
  getters: getters
};
