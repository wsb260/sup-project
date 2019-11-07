import e from "controller/index.js";
export default {
  getData: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/propertyMaster/lhmanagement/list.json"
  },
  recovery: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/easysys/supoffice/supfileSend/sendUserList"
  },
  sellOut: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/easysys/supoffice/supfileSend/sendUserList"
  },
  delete: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/delFile"
  }
};
