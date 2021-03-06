import {
  makeAjaxUrl,
  forEachToJson,
  timeText,
  makeGetAjaxUrl
} from "tool/tool.js";
import api from "controller/api/api.js";
const apiInfo = api.fundManagement.cashManagement;
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
  getAuditData: (state, getters, rootState, rootGetters) => option => {
    var ajaxData = {
      pageNo:
        option && option.current ? option.current : state.auditCurrent || 1,
      pageSize:
        option && option.page_size
          ? option.page_size
          : state.auditPage_size || 10
    };
    if (state.auditSearchType) {
      var searchData = {};
      forEachToJson(state.auditSearchData, (key, v) => {
        if (Boolean(v) && typeof v === "object") {
          searchData[key] = timeText(v);
        } else if (Boolean(v) && typeof v === "string") {
          searchData[key] = v;
        }
      });
    }
    return {
      method: apiInfo.getAuditData.method,
      url:
        apiInfo.getAuditData.url +
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
  agree: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.agree.method,
      url: apiInfo.agree.url,
      data: {
        id: option.id
      }
    };
  },
  refuse: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.refuse.method,
      url: apiInfo.refuse.url,
      data: {
        id: option.id
      }
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
