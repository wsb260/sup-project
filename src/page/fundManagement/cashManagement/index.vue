<template>
  <div
    class="layout-page-tool"
    :class="'pageBody' + (pageWait ? ' wait' : '')"
    style="width:90%;height:100%;margin:0 auto;padding-top:20px"
  >
    <Tabs :animated="false">
      <TabPane label="提现列表">
        <cash-list ref="cashList"></cash-list>
      </TabPane>
      <TabPane label="提现审核记录">
        <cash-audit ref="cashAudit"></cash-audit>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import cashAudit from "./components/cashAudit";
import cashList from "./components/cashList";
export default {
  data() {
    return {};
  },
  computed: {
    pageWait() {
      return this.$store.state.cashManagement.pageWait;
    }
  },
  components: {
    cashAudit,
    cashList
  },
  mounted() {
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });
  }
};
</script>

