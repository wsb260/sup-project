import e from "controller/index.js";
export default {
  getData: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/SMSManagement/systemMessageList/list.json"
  },
  getByIdData: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/easysys/suparticle/list/byIdData"
  },
  sendInfo: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/suparticle/list/byIdData"
  },
  delete: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/delFile"
  }
};
