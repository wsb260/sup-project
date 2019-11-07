<template>
  <div class="layout-nav">
    <div class="logo">
      后台管理
      <Icon class="logo-icon" type="md-menu" />
    </div>
    <el-row class="tac" style="z-index:500">
      <el-col :span="24">
        <el-menu
          :default-active="$router.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="rgba(255,255,255,0)"
          text-color="#fff"
          active-text-color="#fff"
          :collapse-transition="true"
          :router="true"
          :unique-opened="true"
        >
          <el-submenu v-for="item in mainMenu" :key="item.id" :index="item.id + '' ">
            <template slot="title">
              <i :class="item.icon" style="color:#fff;"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index="item1.describe"
              @click="toPage"
            >{{item1.title}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import "./mainMenu.scss";
export default {
  data() {
    return {
      lion: "../../../static/img/lion.png"
    };
  },
  computed: {
    mainMenu() {
      return this.$store.state.mainMenu.mainMenu;
    }
  },
  mounted() {},
  methods: {
    goToPage(obj) {
      this.$store.commit("mainMenu/clickMenu", obj.name);
      this.$store.commit("pageTab/addTabs", obj.name);
      this.$router.push(obj.describe);
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    toPage(e) {
      this.$store.commit("pageTab/addTabs", e.index.substr(1));
    }
  }
};
</script>
