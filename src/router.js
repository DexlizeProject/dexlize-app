import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
      {
        path: '/',
          name: 'home',
          component: require('@/pages/home').default
      },
    {
      path: '/pub',
      name: 'pub',
      component: require('@/pages/pub').default
    },
      {
        path: '/kyubey',
          name: 'kyubey',
          component: require('@/pages/kyubey').default
      }
  ] 
});

