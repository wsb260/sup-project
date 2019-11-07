<template>
  <div
    class="layout-page-tool"
    :class="'pageBody' + (pageWait ? ' wait' : '')"
    style="width:90%;height:100%;margin:0 auto;padding-top:20px"
  >
    秀币数量：
    <span v-text="num"></span>
    <Tabs ref="tabs" value="name1" :animated="false">
      <TabPane label="充值记录" name="rechargeRecord">
        <recharge-record ref="rechargeRecord"></recharge-record>
      </TabPane>
      <TabPane label="奖励记录" name="awardRecord"></TabPane>
      <TabPane label="消费记录" name="consumptionRecord"></TabPane>
      <TabPane label="提现记录" name="withdrawalsRecord"></TabPane>
    </Tabs>
  </div>
</template>
<script>
import rechargeRecord from "./rechargeRecord";
export default {
  data() {
    return {
      num: "521"
    };
  },
  computed: {
    pageWait() {
      return this.$store.state.normalUser.pageWait;
    }
  },
  components: {
    rechargeRecord
  },
  mounted() {
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });
    this.$refs.tabs.activeKey = "rechargeRecord";
  },
  methods: {
    searchMember() {
      this.$store.dispatch({
        type: "normalUser/refreshData",
        searchType: this.searchData.statusStr,
        current: 1
      });
    },
    page_change(newPage) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "normalUser/refreshData",
          current: newPage
        });
      }
    },
    page_size_change(newPageSiae) {
      if (!this.tableLoading) {
        this.$store.dispatch({
          type: "normalUser/refreshData",
          current: 1,
          pageSize: newPageSiae
        });
      }
    }
  }
};
</script>

