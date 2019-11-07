import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "src/store/main.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/scss/font-awesome.scss";
import "assets/css/rewriting.scss";
import "assets/css/main.scss";
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(VueQuillEditor);

Vue.config.productionTip = false;
Vue.use(ViewUI);
Vue.use(ElementUI, { size: "small", zIndex: 3000 });

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
