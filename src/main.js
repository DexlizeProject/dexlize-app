import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import store from './store';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faWallet, 
  faInfo, 
  faDollarSign,
  faChevronLeft,
  faChevronRight,
    faChevronDown,
    faTimes,
  faSignOutAlt,
  faSearchDollar,
  faHome,
  faComments,
    faCaretDown,
    faCaretUp
} from '@fortawesome/free-solid-svg-icons'
import brands from '@fortawesome/fontawesome-free-brands'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/notification.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/alert.css';
import 'element-ui/lib/theme-chalk/tooltip.css';
import VueI18n from 'vue-i18n';
import translate from './i18n'

library.add(
  faWallet, 
  faInfo, 
  faDollarSign,
  faChevronLeft,
  faChevronRight,
  faSignOutAlt,
  faSearchDollar,
  faHome,
  brands,
  faComments,
    faChevronDown,
    faTimes,
    faCaretDown,
    faCaretUp
);

import 'normalize.css';
import './style.css';

Vue.config.productionTip = false;

Vue.use(VueI18n)
Vue.use(ElementUI);
Vue.component('font-awesome-icon', FontAwesomeIcon)


const i18n = new VueI18n({
    locale: 'zh',
    messages: translate
})

new Vue({
  store,
  router,
    i18n,
  render: h => h(App)
}).$mount('#app');
