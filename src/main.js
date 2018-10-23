import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/base.css';
// import 'element-ui/lib/theme-chalk/notification.css';
// import 'element-ui/lib/theme-chalk/message.css';
// import 'element-ui/lib/theme-chalk/dialog.css';
// import 'element-ui/lib/theme-chalk/alert.css';
// import 'element-ui/lib/theme-chalk/tooltip.css';
import store from './store';
import router from './router';
import DexDialog from '@/components/dex-dialog.vue';
import DexAlert from '@/components/dex-alert.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faChevronLeft,
  faChevronRight,
    faTimes,
    faCaretDown,
    faCaretUp,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faChevronLeft,
    faChevronRight,
    faTimes,
    faCaretDown,
    faCaretUp,
    faExclamationCircle
);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import VueI18n from 'vue-i18n';
import translate from './i18n'

import 'normalize.css';
import './style.css';

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('dex-dialog', DexDialog)
Vue.component('dex-alert', DexAlert)

Vue.use(VueI18n)
// Vue.use(ElementUI);

Vue.config.productionTip = false;

const i18n = new VueI18n({
    locale: 'en',
    messages: translate
})

new Vue({
  store,
  router,
    i18n,
  render: h => h(App)
}).$mount('#app');
