import { forEachToJson } from "tool/tool.js";
export default {
  namespaced: true,
  state: {
    noticeInfo: {
      type: true,
      title: "",
      desc: "",
      name: 0
    }
  },
  mutations: {
    noticeSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: payload.title || "",
        desc: payload.desc || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    noticeError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: payload.title || "",
        desc: payload.desc || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    dataSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "数据获取成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    dataError(state, payload) {
      let desc = "";
      if (typeof payload == "string") {
        desc = payload;
      } else {
        forEachToJson(payload, (i, v) => {
          if (v) {
            if (v.data && !v.data.status == "ok") {
              desc = v.data.msg;
              return false;
            }
          } else {
            desc = i + " is undefined";
            return false;
          }
        });
      }
      state.noticeInfo = {
        type: false,
        title: "数据获取失败!",
        desc: desc,
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    saveSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "保存成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    dispSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "分派成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    saveError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: "保存失败!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    publishSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "发布成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    publishError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: "发布失败!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    delSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "删除成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    delError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: "删除失败!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    sendSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "发送成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    sendError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: "发送失败!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    revokeSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "撤销分派成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    revokeError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: "撤销分派失败!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    disqualificationSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "取消成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    disqualificationError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: "取消失败!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    },
    transportOverSuccess(state, payload) {
      state.noticeInfo = {
        type: true,
        title: "操作成功!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
    },
    transportOverError(state, payload) {
      state.noticeInfo = {
        type: false,
        title: "操作失败!",
        desc: payload || "",
        name: state.noticeInfo.name + 1
      };
      log(payload);
    }
  } //mutations END
};
