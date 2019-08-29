/* eslint-disable no-multi-assign */
import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/api',
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
