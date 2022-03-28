import Vue from "vue";
import App from "./App.vue";
import "normalize.css/normalize.css"; // CSS重置

import dataV from "@jiaminghi/data-view";
import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
import vmodal from "vue-js-modal";
import Toast from "./components/toast/toast";

import "./components/toast/toast.css";

Vue.use(VueFullPage);
Vue.use(dataV);
Vue.use(vmodal);
Vue.use(Toast);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
