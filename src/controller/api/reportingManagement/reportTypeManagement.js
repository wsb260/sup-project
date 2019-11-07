import e from "controller/index.js";
export default {
  getData: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/reportingManagement/reportTypeManagement/list.json"
  },
  getByIdData: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/easysys/suparticle/list/byIdData"
  },
  saveNew: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/sendFile"
  },
  saveEdit: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/ArticleManagement/articleRotation/Edit.json"
  },
  sendUserList: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/easysys/supoffice/supfileSend/sendUserList"
  },
  updateFileState: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/updateFileState"
  },
  upLoad: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/easysys/supoffice/supfileSend/uploadFile"
  },
  delete: {
    method: e.type == 1 ? "POST" : "POST",
    url: e.base + "/easysys/supoffice/supfileSend/delFile"
  }
};
