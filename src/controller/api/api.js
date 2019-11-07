import e from "../index.js";
// 系统首页
import fastNav from "./home/fastNav"
import websiteDataStatistics from "./home/websiteDataStatistics"
import systemLog from "./home/systemLog"

// 直播管理
import classifiedManagement from "./liveBroadcastManagement/classifiedManagement"
import liveListInProgress from "./liveBroadcastManagement/liveListInProgress"
import monitor from "./liveBroadcastManagement/monitor"
import rebroadcastList from "./liveBroadcastManagement/rebroadcastList"
// 用户管理
import normalUser from "./userManagement/normalUser"
import anchorManagement from "./userManagement/anchorManagement"
import invitationManagement from "./userManagement/invitationManagement"
// 视频管理
import smallVideoList from "./videoManagement/smallVideoList"
import commentList from "./videoManagement/commentList"
import videoAuditList from "./videoManagement/videoAuditList"
// 客服
import listOfMessages from "./customerService/listOfMessages"
import textAndPictureEditing from "./customerService/textAndPictureEditing"
import messageRecord from "./customerService/messageRecord"
import viewUserInformation from "./customerService/viewUserInformation"
// im记录
import record from "./records/record"
// 短信管理
import shortMessageList from "./SMSManagement/shortMessageList"
import systemMessageList from "./SMSManagement/systemMessageList"
import businessQueueList from "./SMSManagement/businessQueueList"
// 道具管理
import giftList from "./propertyMaster/giftList"
import consumptionStatistics from "./propertyMaster/consumptionStatistics"
import lhmanagement from "./propertyMaster/lhmanagement"
// 举报管理
import reportingList from "./reportingManagement/reportingList"
import reportTypeManagement from "./reportingManagement/reportTypeManagement"
// 认证管理
import authenticationList from "./authenticationManagement/authenticationList"
// 资金管理
import statisticalChart from "./fundManagement/statisticalChart"
import cashManagement from "./fundManagement/cashManagement"
import rechargeRecord from "./fundManagement/rechargeRecord"
import interfaceManagement from "./fundManagement/interfaceManagement"
// 系统设置
import systemSetup from "./systemSetup/systemSetup"
import mobilePlatformSettings from "./systemSetup/mobilePlatformSettings"
import systemAdministrator from "./systemSetup/systemAdministrator"


// 下拉框数据
import selectData from "./tool/selectData.js";
import address from "./tool/address.js";

export default {
  host: e.base,
  index: {},
  mainMenu: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/test.json"
    // url: e.base + "/easysys/suphomepage/current"
  },
  // 系统首页
  home: {
    fastNav: fastNav,
    websiteDataStatistics: websiteDataStatistics,
    systemLog: systemLog
  },
  // 直播管理
  liveBroadcastManagement: {
    classifiedManagement: classifiedManagement,
    liveListInProgress: liveListInProgress,
    monitor: monitor,
    rebroadcastList: rebroadcastList
  },
  // 用户管理
  userManagement: {
    normalUser: normalUser,
    anchorManagement: anchorManagement,
    invitationManagement: invitationManagement
  },
  // 视频管理
  videoManagement: {
    smallVideoList: smallVideoList,
    commentList: commentList,
    videoAuditList: videoAuditList
  },
  // 客服
  customerService: {
    listOfMessages: listOfMessages,
    textAndPictureEditing: textAndPictureEditing,
    messageRecord: messageRecord,
    viewUserInformation: viewUserInformation
  },
  // im记录
  records: {
    record: record
  },
  // 短信管理
  SMSManagement: {
    shortMessageList: shortMessageList,
    systemMessageList: systemMessageList,
    businessQueueList: businessQueueList
  },
  // 道具管理
  propertyMaster: {
    giftList: giftList,
    consumptionStatistics: consumptionStatistics,
    lhmanagement: lhmanagement
  },
  // 举报管理
  reportingManagement: {
    reportingList: reportingList,
    reportTypeManagement: reportTypeManagement
  },
  // 认证管理
  authenticationManagement: {
    authenticationList: authenticationList
  },
  // 资金管理
  fundManagement: {
    statisticalChart: statisticalChart,
    cashManagement: cashManagement,
    rechargeRecord: rechargeRecord,
    interfaceManagement: interfaceManagement
  },
  // 系统设置
  systemSetup: {
    systemSetup: systemSetup,
    mobilePlatformSettings: mobilePlatformSettings,
    systemAdministrator: systemAdministrator
  },

  // 下拉框数据
  selectData: selectData,
  address: address
};
