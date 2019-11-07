<template>
  <div class="rebroadcastList">
    <Tabs value="name1">
      <TabPane label="查看直播记录" name="name1">
        <living-list></living-list>
      </TabPane>
      <TabPane label="热度记录" name="name2"></TabPane>
      <TabPane label="礼物记录" name="name3">
        <gift-list ref="giftList"></gift-list>
      </TabPane>
    </Tabs>
    <!-- <heat-list ref="heatList"></heat-list> -->
  </div>
</template>
<script>
import livingList from "./components/livingList";
import heatList from "./components/heatList";
import giftList from "./components/giftList";
import "./index.scss";
export default {
  data() {
    return {};
  },
  components: {
    livingList,
    heatList,
    giftList
  },
  created() {
    this.$store.dispatch({
      type: "rebroadcastList/refreshData"
    });
    this.$store.dispatch({
      type: "rebroadcastList/refreshGiftData"
    });
  }
};
</script>