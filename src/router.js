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
      path: '/tokens',
      name: 'tokens',
      component: require('@/pages/tokens').default
    },
      {
        path: '/kyubey',
          name: 'kyubey',
          component: require('@/pages/kyubey').default
      }
    // {
    //   path: '/tokens/publish',
    //   name: 'publish',
    //   component: require('@/pages/publish').default
    // },
    // {
    //   path: '/tokens/termsheet',
    //   name: 'termsheet',
    //   component: require('@/pages/termsheet').default
    // }
  ] 
});

