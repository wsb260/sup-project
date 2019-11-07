import { makeAjaxUrl } from "tool/tool.js";
import api from "controller/api/api.js";
const apiInfo = api.apply;
export default {
  saveData: (state, getters, rootState, rootGetters) => option => {
    var formData = new FormData();
    formData.append("name", state.byIdData.name);
    formData.append("cUserId", state.byIdData.cUserId);
    formData.append("nature", Number(state.byIdData.nature));
    formData.append("tradeType", Number(state.byIdData.tradeType));
    formData.append("memberScale", Number(state.byIdData.memberScale));
    formData.append("level", Number(state.byIdData.level));
    formData.append("province", Number(state.byIdData.province));
    formData.append("city", Number(state.byIdData.city));
    formData.append("email", state.byIdData.email);
    formData.append("contacts", state.byIdData.contacts);
    formData.append("telephone", state.byIdData.telephone);
    formData.append("adress", state.byIdData.adress);
    formData.append("introduction", state.byIdData.introduction);
    formData.append("isVerifyEmail", 1);
    formData.append("password", state.byIdData.passwdCheck);
    formData.append("isJumpOver", Number(state.byIdData.isJumpOver));
    if (state.byIdData.isJumpOver == 0) {
      formData.append("creditCode", state.byIdData.creditCode);
      formData.append("authFile", state.byIdData.authFile);
      formData.append("naturalFile", state.byIdData.naturalFile);
    }
    return {
      method: apiInfo.saveNew.method,
      url: apiInfo.saveNew.url,
      data: formData
    };
  },
  sendCode: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.sendCode.method,
      url: apiInfo.sendCode.url,
      data: {
        baseType: "6",
        telephone: state.byIdData.email
      }
    };
  },
  industryTypes: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.industryTypes.method,
      url: apiInfo.industryTypes.url + "?" + "dictType=" + state.byIdData.nature
    };
  },
  dictList: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.dictList.method,
      url: apiInfo.dictList.url + "?" + "dictType=3"
    };
  },
  proviceData: (state, getters, rootState, rootGetters) => option => {
    let parentId = 0;
    typeof option.val === "number" ? (parentId = option.val) : (parentId = 0);
    return {
      method: apiInfo.proviceData.method,
      url: apiInfo.proviceData.url + "?" + "parentId=" + parentId
    };
  },
  verifyEmail: (state, getters, rootState, rootGetters) => option => {
    return {
      method: apiInfo.verifyEmail.method,
      url: apiInfo.verifyEmail.url,
      data: {
        regCode: state.byIdData.regCode,
        email: state.byIdData.email
      }
    };
  }
};
