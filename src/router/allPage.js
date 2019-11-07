const keepAliveOption = {
  aa: true
};
export default [
  //  系统首页

  //网站数据统计
  {
    name: "websiteDataStatistics",
    path: "/websiteDataStatistics",
    meta: {
      title: "网站数据统计",
      keepAlive: keepAliveOption.websiteDataStatistics,
      allPath: ["websiteDataStatistics"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/home/websiteDataStatistics/index.vue")
  },
  //系统日志
  {
    name: "systemLog",
    path: "/systemLog",
    meta: {
      title: "系统日志",
      keepAlive: keepAliveOption.systemLog,
      allPath: ["systemLog"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/home/systemLog/index.vue")
  },

  // 直播管理

  // 分类管理
  {
    name: "classifiedManagement",
    path: "/classifiedManagement",
    meta: {
      title: "分类管理",
      keepAlive: keepAliveOption.classifiedManagement,
      allPath: ["classifiedManagement"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/liveBroadcastManagement/classifiedManagement/index.vue")
  },
  // 正在直播列表
  {
    name: "liveListInProgress",
    path: "/liveListInProgress",
    meta: {
      title: "正在直播列表",
      keepAlive: keepAliveOption.liveListInProgress,
      allPath: ["liveListInProgress"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/liveBroadcastManagement/liveListInProgress/index.vue")
  },
  // 监控
  {
    name: "monitor",
    path: "/monitor",
    meta: {
      title: "监控",
      keepAlive: keepAliveOption.monitor,
      allPath: ["monitor"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/liveBroadcastManagement/monitor/index.vue")
  },
  // 回播列表
  {
    name: "rebroadcastList",
    path: "/rebroadcastList",
    meta: {
      title: "回播列表",
      keepAlive: keepAliveOption.rebroadcastList,
      allPath: ["rebroadcastList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/liveBroadcastManagement/rebroadcastList/index.vue")
  },

  // 用户管理

  // 普通用户
  {
    name: "normalUser",
    path: "/normalUser",
    meta: {
      title: "普通用户",
      keepAlive: keepAliveOption.normalUser,
      allPath: ["normalUser"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/userManagement/normalUser/index.vue")
  },
  // 普通用户-账户日志
  {
    name: "accountLog",
    path: "/accountLog",
    meta: {
      title: "账户日志",
      keepAlive: keepAliveOption.accountLog,
      allPath: ["accountLog"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/userManagement/normalUser/components/accountLog.vue")
  },
  // 主播管理
  {
    name: "anchorManagement",
    path: "/anchorManagement",
    meta: {
      title: "主播管理",
      keepAlive: keepAliveOption.anchorManagement,
      allPath: ["anchorManagement"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/userManagement/anchorManagement/index.vue")
  },
  // 邀请管理
  {
    name: "invitationManagement",
    path: "/invitationManagement",
    meta: {
      title: "邀请管理",
      keepAlive: keepAliveOption.invitationManagement,
      allPath: ["invitationManagement"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/userManagement/invitationManagement/index.vue")
  },
  // 视频管理

  // 小视频列表
  {
    name: "smallVideoList",
    path: "/smallVideoList",
    meta: {
      title: "小视频列表",
      keepAlive: keepAliveOption.smallVideoList,
      allPath: ["smallVideoList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/videoManagement/smallVideoList/index.vue")
  },
  // 评论列表
  {
    name: "commentList",
    path: "/commentList",
    meta: {
      title: "评论列表",
      keepAlive: keepAliveOption.commentList,
      allPath: ["commentList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/videoManagement/commentList/index.vue")
  },
  // 视频审核列表
  {
    name: "videoAuditList",
    path: "/videoAuditList",
    meta: {
      title: "视频审核列表",
      keepAlive: keepAliveOption.videoAuditList,
      allPath: ["videoAuditList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/videoManagement/videoAuditList/index.vue")
  },
  // 客服

  // 待处理消息列表
  {
    name: "listOfMessages",
    path: "/listOfMessages",
    meta: {
      title: "待处理消息列表",
      keepAlive: keepAliveOption.listOfMessages,
      allPath: ["listOfMessages"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/customerService/listOfMessages/index.vue")
  },
  // 文字图片编辑
  {
    name: "textAndPictureEditing",
    path: "/textAndPictureEditing",
    meta: {
      title: "文字图片编辑",
      keepAlive: keepAliveOption.textAndPictureEditing,
      allPath: ["textAndPictureEditing"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/customerService/textAndPictureEditing/index.vue")
  },
  // 消息记录
  {
    name: "messageRecord",
    path: "/messageRecord",
    meta: {
      title: "消息记录",
      keepAlive: keepAliveOption.messageRecord,
      allPath: ["messageRecord"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/customerService/messageRecord/index.vue")
  },
  // 查看用户信息
  {
    name: "viewUserInformation",
    path: "/viewUserInformation",
    meta: {
      title: "查看用户信息",
      keepAlive: keepAliveOption.viewUserInformation,
      allPath: ["viewUserInformation"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/customerService/viewUserInformation/index.vue")
  },

  // im记录

  // im记录
  {
    name: "record",
    path: "/record",
    meta: {
      title: "im记录",
      keepAlive: keepAliveOption.record,
      allPath: ["record"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/records/record/index.vue")
  },
  // 短信管理

  // 短信接口列表
  {
    name: "shortMessageList",
    path: "/shortMessageList",
    meta: {
      title: "短信接口列表",
      keepAlive: keepAliveOption.shortMessageList,
      allPath: ["shortMessageList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/SMSManagement/shortMessageList/index.vue")
  },
  // 系统消息列表
  {
    name: "systemMessageList",
    path: "/systemMessageList",
    meta: {
      title: "系统消息列表",
      keepAlive: keepAliveOption.systemMessageList,
      allPath: ["systemMessageList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/SMSManagement/systemMessageList/index.vue")
  },
  // 业务队列列表
  {
    name: "businessQueueList",
    path: "/businessQueueList",
    meta: {
      title: "业务队列列表",
      keepAlive: keepAliveOption.businessQueueList,
      allPath: ["businessQueueList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/SMSManagement/businessQueueList/index.vue")
  },
  // 道具管理

  // 礼物列表
  {
    name: "giftList",
    path: "/giftList",
    meta: {
      title: "礼物列表",
      keepAlive: keepAliveOption.giftList,
      allPath: ["giftList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/propertyMaster/giftList/index.vue")
  },
  // 消耗统计
  {
    name: "consumptionStatistics",
    path: "/consumptionStatistics",
    meta: {
      title: "消耗统计",
      keepAlive: keepAliveOption.consumptionStatistics,
      allPath: ["consumptionStatistics"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/propertyMaster/consumptionStatistics/index.vue")
  },
  // 靓号管理
  {
    name: "lhmanagement",
    path: "/lhmanagement",
    meta: {
      title: "靓号管理",
      keepAlive: keepAliveOption.lhmanagement,
      allPath: ["lhmanagement"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/propertyMaster/lhmanagement/index.vue")
  },
  // 举报管理

  // 举报列表
  {
    name: "reportingList",
    path: "/reportingList",
    meta: {
      title: "举报列表",
      keepAlive: keepAliveOption.reportingList,
      allPath: ["reportingList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/reportingManagement/reportingList/index.vue")
  },
  // 举报类型管理
  {
    name: "reportTypeManagement",
    path: "/reportTypeManagement",
    meta: {
      title: "举报类型管理",
      keepAlive: keepAliveOption.reportTypeManagement,
      allPath: ["reportTypeManagement"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/reportingManagement/reportTypeManagement/index.vue")
  },
  // 认证管理

  // 认证列表
  {
    name: "authenticationList",
    path: "/authenticationList",
    meta: {
      title: "认证列表",
      keepAlive: keepAliveOption.authenticationList,
      allPath: ["authenticationList"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () =>
      import("page/authenticationManagement/authenticationList/index.vue")
  },
  // 资金管理

  // 认证列表
  {
    name: "statisticalChart",
    path: "/statisticalChart",
    meta: {
      title: "认证列表",
      keepAlive: keepAliveOption.statisticalChart,
      allPath: ["statisticalChart"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/fundManagement/statisticalChart/index.vue")
  },
  // 提现管理
  {
    name: "cashManagement",
    path: "/cashManagement",
    meta: {
      title: "提现管理",
      keepAlive: keepAliveOption.cashManagement,
      allPath: ["cashManagement"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/fundManagement/cashManagement/index.vue")
  },
  // 充值记录
  {
    name: "rechargeRecord",
    path: "/rechargeRecord",
    meta: {
      title: "充值记录",
      keepAlive: keepAliveOption.rechargeRecord,
      allPath: ["rechargeRecord"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/fundManagement/rechargeRecord/index.vue")
  },
  // 接口管理
  {
    name: "interfaceManagement",
    path: "/interfaceManagement",
    meta: {
      title: "接口管理",
      keepAlive: keepAliveOption.interfaceManagement,
      allPath: ["interfaceManagement"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/fundManagement/interfaceManagement/index.vue")
  },

  // 系统设置

  // 系统设置
  {
    name: "systemSetup",
    path: "/systemSetup",
    meta: {
      title: "系统设置",
      keepAlive: keepAliveOption.systemSetup,
      allPath: ["systemSetup"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/systemSetup/systemSetup/index.vue")
  },
  // 移动平台设置
  {
    name: "mobilePlatformSettings",
    path: "/mobilePlatformSettings",
    meta: {
      title: "移动平台设置",
      keepAlive: keepAliveOption.mobilePlatformSettings,
      allPath: ["mobilePlatformSettings"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/systemSetup/mobilePlatformSettings/index.vue")
  },
  // 系统管理员
  {
    name: "systemAdministrator",
    path: "/systemAdministrator",
    meta: {
      title: "系统管理员",
      keepAlive: keepAliveOption.systemAdministrator,
      allPath: ["systemAdministrator"],
      edit: { path: [], type: true },
      check: { path: [], type: true },
      pageWait: { path: [], type: true },
      popupLoading: { path: [], type: true }
    },
    component: () => import("page/systemSetup/systemAdministrator/index.vue")
  }
];
