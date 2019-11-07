<template>
  <div
    class="layout-page-tool"
    :class="'pageBody' + (pageWait ? ' wait' : '')"
    style="width:90%;height:100%;margin:0 auto;padding-top:20px"
  >
    <Tabs :animated="false">
      <TabPane label="管理员分组列表">
        <cash-audit ref="cashAudit"></cash-audit>
      </TabPane>
      <TabPane label="管理员列表">
        <cash-list ref="cashList"></cash-list>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import cashAudit from "./components/adminGroup";
import cashList from "./components/adminList";
export default {
  data() {
    return {};
  },
  computed: {
    pageWait() {
      return this.$store.state.systemAdministrator.pageWait;
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

