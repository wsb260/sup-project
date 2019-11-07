<template>
  <div id="app" class="wh100">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import p from "controller/projectOption.js";
export default {
  created() {
    this.$store.dispatch("mainMenu/getData").then(type => {
      this.$router.push("/" + (type ? "index" : "index"));
    });
  },
  mounted() {
    document.title = p.title;
  }
};
</script>

<style>
#app {
  font-family: "Microsoft YaHei", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* overflow: hidden; */
}
</style>
