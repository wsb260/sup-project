import e from "controller/index.js"
export default {
  orgtype: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/org/orgtype.json"
  },
  uporgname: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/org/uporgname.json"
  },
  crmid: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/clientshipment/crmid.json"
  },
  orgarea: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/org/orgarea.json"
  },
  opertype: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/oper/opertype.json"
  },
  carowner_nm: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/deliveryresource/carowner_nm.json"
  },
  cartype: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/deliveryresource/cartype.json"
  },
  cardtype: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/deliveryresource/cardtype.json"
  },
  blcname: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/deliveryresource/blcname.json"
  },
  blcstatus: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercmc/blcstatus.json"
  },
  blctype: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercmc/blctype.json"
  },
  settlement: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercmc/settlement.json"
  },
  crmtrade: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercrm/crmtrade.json"
  },
  crmstatus: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercrm/crmstatus.json"
  },
  crmtype: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercrm/crmtype.json"
  },
  crmgrade: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercrm/crmgrade.json"
  },
  crmsource: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/ordercrm/crmsource.json"
  },
  crmnameId: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderlogistics/crmnameId.json"
  },
  delivery_way: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderlogistics/delivery_way.json"
  },
  carnolist: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderassign/carnolist.json"
  },
  STATUS: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderassign/status.json"
  },
  type: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderassign/type.json"
  },
  abnormal_type: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/abnormalcargohandle/abnormal_type.json"
  },
  apply_status: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/abnormalcargoexamine/apply_status.json"
  },
  status: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderproductquery/status.json"
  },
  status_orderquery: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderquery/orderstatus.json"
  },
  upanddownstatus: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/orderproductquery/upanddownstatus.json"
  },
  trancompanyid: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/transhipmentquery/trancompanyid.json"
  },
  transtatus: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/transhipmentquery/transtatus.json"
  },
  treeloader: {
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/deliverymanage/treeloader.json"
  },
  DELIVERY_LOGISTICS_COMPANY_ID:{
    method: e.type == 1 ? "GET" : "GET",
    url: e.base + "/deliverymanage/logisticsCompany.json"
  },
  allOrgs: {
    method: e.type == 1 ? "GET" : "POST",
    url: e.base + "/orderlogistics/allOrgs.json"
  },
  rejectionTypes:{
    method: e.type == 1 ? "GET" : "POST",
    url: e.base + "/orderplan/rejectiontypes.json"
  }
}
