import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import pinia from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  pinia,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
