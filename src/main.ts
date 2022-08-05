import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import pinia from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

function initApp() {
  new Vue({
    router,
    pinia,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
}

async function initialize() {
  axios
    .get('/user')
    .then(() => {
      initApp();
    })
    .catch(() => {
      if (process.env.NODE_ENV === 'production') {
        return (window.location.href = process.env.VUE_APP_CENDANA_URL || '/');
      } else {
        initApp();
      }
    });
}

window.addEventListener('load', () => {
  initialize();
});
