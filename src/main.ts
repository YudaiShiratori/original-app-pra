import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false;


Vue.use(Vuetify, {
  theme: {
    original: colors.purple.base,
    theme: '#5982EE',
    background: '#ffffff',
    twitter: '#00aced',
    facebook: '#305097',
    line: '#5ae628',
    red: '#F26964',
    error: '#F26964',
    succcess: '#698FF0',
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    info: '#2196F3',
    warning: '#FFC107',
  },
  options: {
    themeVariations: ['original', 'secondary'],
  },
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

