import {
  makeAjaxUrl,
  forEachToJson,
  timeText,
  makeGetAjaxUrl
} from "tool/tool.js";
import api from "controller/api/api.js";
const apiInfo = api.propertyMaster.lhmanagement;
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
  recovery: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.recovery.method,
      url: apiInfo.recovery.url,
      data: {
        id: option.id
      }
    };
  },
  sellOut: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.sellOut.method,
      url: apiInfo.sellOut.url,
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
