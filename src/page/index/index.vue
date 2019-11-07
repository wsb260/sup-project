<template>
  <div class="layout wh100">
    <main-menu></main-menu>
    <div class="layout-bottom">
      <page-tab v-show="pageTab"></page-tab>
      <div class="layout-content" :class="[pageTab ? 'pathContent' : '']">
        <keep-alive :include="pageNames">
          <router-view v-if="!$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </div>
    </div>
  </div>
</template>

<script>
import "./index.scss";
import poptipBox from "./components/poptipBox.vue";
import mainMenu from "./components/mainMenu/mainMenu.vue";
import pageTab from "./components/pageTab/pageTab.vue";
import projectOption from "controller/projectOption.js";

export default {
  data() {
    return {
      projectOption: projectOption,
      screenHeight: document.body.clientHeight - 70
    };
  },
  created() {},
  computed: {
    notice() {
      if (
        this.$store.state.notice.noticeInfo.title &&
        this.$store.state.notice.noticeInfo.title.length
      ) {
        return this.$store.state.notice.noticeInfo;
      }
      return false;
    },
    logined() {
      return this.$store.state.login.logined;
    },
    pageTab() {
      return this.$store.state.login.pageTab;
    },
    pageNames() {
      return this.$store.state.pageTab.pageNames;
    }
  },
  watch: {
    notice() {
      if (this.notice) {
        if (this.notice.type) {
          this.$Notice.success(this.notice);
        } else {
          this.$Notice.error(this.notice);
        }
      }
    },
    logined() {
      if (!this.logined) {
        this.$router.push("/homepage");
      }
    }
  },
  components: {
    poptipBox,
    mainMenu,
    pageTab
  },
  mounted() {},
  activated() {
    this.$store.commit("pageTab/reset");
    this.$store.dispatch({
      type: "mainMenu/getData"
    });
  },
  methods: {}
};
</script>
