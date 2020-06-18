import Vue from 'vue/dist/vue.esm.js';
import App from './App.vue';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
