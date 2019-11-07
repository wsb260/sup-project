import e from "controller/index.js";
export default {
    getData: {
        method: e.type == 1 ? "GET" : "GET",
        url: e.base + "/liveBroadcastManagement/classifiedManagement/list.json"
    },
    saveNew: {
        method: e.type == 1 ? "POST" : "POST",
        url: e.base + "/easysys/supoffice/supfileSend/sendFile"
    },
    delete: {
        method: e.type == 1 ? "POST" : "POST",
        url: e.base + "/easysys/supoffice/supfileSend/delFile"
    }
};
