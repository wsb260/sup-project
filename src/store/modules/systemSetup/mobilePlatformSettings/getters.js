import {
  makeAjaxUrl,
  forEachToJson,
  timeText,
  makeGetAjaxUrl
} from "tool/tool.js";
import api from "controller/api/api.js";
const apiInfo = api.systemSetup.mobilePlatformSettings;
export default {
  getData: (state, getters, rootState, rootGetters) => option => {
    var ajaxData = {
      pageNo: option && option.current ? option.current : state.current || 1,
      pageSize:
        option && option.page_size ? option.page_size : state.page_size || 10
    };
    if (state.searchType) {
      var searchData = {};
      forEachToJson(state.searchData, (key, v) => {
        if (Boolean(v) && typeof v === "object") {
          searchData[key] = timeText(v);
        } else if (Boolean(v) && typeof v === "string") {
          searchData[key] = v;
        }
      });
    }
    return {
      method: apiInfo.getData.method,
      url:
        apiInfo.getData.url +
        (makeGetAjaxUrl(searchData) != "?" ? makeGetAjaxUrl(searchData) : "") +
        (makeGetAjaxUrl(searchData) != "?"
          ? "&" + makeAjaxUrl(ajaxData)
          : "?" + makeAjaxUrl(ajaxData))
    };
  },
  getByIdData: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.getByIdData.method,
      url: apiInfo.getByIdData.url + makeGetAjaxUrl({ id: option.id })
    };
  },
  saveNew: (state, getters, rootState, rootGetters) => option => {
    let formData = new FormData();
    formData.append("receiveId", state.byIdData.receiveId);
    formData.append("receiveUserType", option.userType);
    formData.append("title", state.byIdData.title);
    formData.append("content", state.byIdData.content);
    option.fileUpload == null
      ? ""
      : formData.append("fileUpload", option.fileUpload);
    return {
      method: apiInfo.saveNew.method,
      url: apiInfo.saveNew.url,
      data: formData
    };
  },
  saveEdit: (state, getters, rootState, rootGetters) => option => {
    let formData = new FormData();
    formData.append("receiveId", option.receiveId);
    formData.append("receiveUserType", option.userType);
    formData.append("title", state.byIdData.title);
    formData.append("content", state.byIdData.content);
    formData.append("id", option.id);
    option.fileUpload == null
      ? ""
      : formData.append("fileUpload", option.fileUpload);
    return {
      method: apiInfo.saveNew.method,
      url: apiInfo.saveNew.url,
      data: formData
    };
  },
  sendUserList: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.sendUserList.method,
      url: apiInfo.sendUserList.url
    };
  },
  updateFileState: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.updateFileState.method,
      url: apiInfo.updateFileState.url,
      data: {
        id: option.id,
        state: option.state === "undefined" ? option.stateName : option.state,
        attribute: option.attribute
      }
    };
  },
  upLoad: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.upLoad.method,
      url:
        apiInfo.upLoad.url +
        makeGetAjaxUrl({
          fileName: option.fileName,
          filePath: option.filePath
        })
    };
  },
  delete: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.delete.method,
      url: apiInfo.delete.url,
      data: {
        id: option.id
      }
    };
  }
};
