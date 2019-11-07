import Vue from "vue";
import vuex from "vuex";
Vue.use(vuex);

import index from "./index/index.js";
import notice from "./tool/notice.js";
import login from "./login/index.js";
import pageTab from "./index/pageTab.js";
import mainMenu from "./tool/mainMenu/index.js";
// 系统首页
import fastNav from "./modules/home/fastNav/index.js";
import websiteDataStatistics from "./modules/home/websiteDataStatistics/index.js";
import systemLog from "./modules/home/systemLog/index.js";
// 直播管理
import classifiedManagement from "./modules/liveBroadcastManagement/classifiedManagement/index.js";
import liveListInProgress from "./modules/liveBroadcastManagement/liveListInProgress/index.js";
import monitor from "./modules/liveBroadcastManagement/monitor/index.js";
import rebroadcastList from "./modules/liveBroadcastManagement/rebroadcastList/index.js";
// 用户管理
import normalUser from "./modules/userManagement/normalUser/index.js";
import anchorManagement from "./modules/userManagement/anchorManagement/index.js";
import invitationManagement from "./modules/userManagement/invitationManagement/index.js";
// 视频管理
import smallVideoList from "./modules/videoManagement/smallVideoList/index.js";
import commentList from "./modules/videoManagement/commentList/index.js";
import videoAuditList from "./modules/videoManagement/videoAuditList/index.js";
// 客服
import listOfMessages from "./modules/customerService/listOfMessages/index.js";
import textAndPictureEditing from "./modules/customerService/textAndPictureEditing/index.js";
import messageRecord from "./modules/customerService/messageRecord/index.js";
import viewUserInformation from "./modules/customerService/viewUserInformation/index.js";
// im记录
import record from "./modules/records/record/index.js";
// 短信管理
import shortMessageList from "./modules/SMSManagement/shortMessageList/index.js";
import systemMessageList from "./modules/SMSManagement/systemMessageList/index.js";
import businessQueueList from "./modules/SMSManagement/businessQueueList/index.js";
// 道具管理
import giftList from "./modules/propertyMaster/giftList/index.js";
import consumptionStatistics from "./modules/propertyMaster/consumptionStatistics/index.js";
import lhmanagement from "./modules/propertyMaster/lhmanagement/index.js";
// 举报管理
import reportingList from "./modules/reportingManagement/reportingList/index.js";
import reportTypeManagement from "./modules/reportingManagement/reportTypeManagement/index.js";
// 认证管理
import authenticationList from "./modules/authenticationManagement/authenticationList/index.js";
// 资金管理
import statisticalChart from "./modules/fundManagement/statisticalChart/index.js";
import cashManagement from "./modules/fundManagement/cashManagement/index.js";
import rechargeRecord from "./modules/fundManagement/rechargeRecord/index.js";
import interfaceManagement from "./modules/fundManagement/interfaceManagement/index.js";
// 系统设置
import systemSetup from "./modules/systemSetup/systemSetup/index.js";
import mobilePlatformSettings from "./modules/systemSetup/mobilePlatformSettings/index.js";
import systemAdministrator from "./modules/systemSetup/systemAdministrator/index.js";





export default new vuex.Store({
  modules: {
    index: index,
    notice: notice,
    login: login,
    pageTab: pageTab,
    mainMenu: mainMenu,
    // 系统首页
    fastNav: fastNav,
    websiteDataStatistics: websiteDataStatistics,
    systemLog: systemLog,
    // 直播管理
    classifiedManagement: classifiedManagement,
    liveListInProgress: liveListInProgress,
    monitor: monitor,
    rebroadcastList: rebroadcastList,
    // 用户管理
    normalUser: normalUser,
    anchorManagement: anchorManagement,
    invitationManagement: invitationManagement,
    // 视频管理
    smallVideoList: smallVideoList,
    commentList: commentList,
    videoAuditList: videoAuditList,
    // 客服
    listOfMessages: listOfMessages,
    textAndPictureEditing: textAndPictureEditing,
    messageRecord: messageRecord,
    viewUserInformation: viewUserInformation,
    // im记录
    record: record,
    // 短信管理
    shortMessageList: shortMessageList,
    systemMessageList: systemMessageList,
    businessQueueList: businessQueueList,
    // 道具管理
    giftList: giftList,
    consumptionStatistics: consumptionStatistics,
    lhmanagement: lhmanagement,
    // 举报管理
    reportingList: reportingList,
    reportTypeManagement: reportTypeManagement,
    // 认证管理
    authenticationList: authenticationList,
    // 资金管理
    statisticalChart: statisticalChart,
    cashManagement: cashManagement,
    rechargeRecord: rechargeRecord,
    interfaceManagement: interfaceManagement,
    // 系统设置
    systemSetup: systemSetup,
    mobilePlatformSettings: mobilePlatformSettings,
    systemAdministrator: systemAdministrator
  }
});
