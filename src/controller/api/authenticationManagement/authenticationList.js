import e from "controller/index.js";
export default {
  getData: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/authenticationManagement/authenticationList/list.json"
  },
  getByIdData: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/easysys/suparticle/list/byIdData"
  },
  agree: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/uploadFile"
  },
  refuse: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/uploadFile"
  },
  delete: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/delFile"
  }
};
