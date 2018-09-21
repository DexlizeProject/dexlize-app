import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
      {
        path: '/',
          redirect: '/tokens'
      },
    {
      path: '/tokens',
      name: 'trade',
      component: require('@/pages/home').default
    },
    {
      path: '/tokens/publish',
      name: 'publish',
      component: require('@/pages/publish').default
    },
    {
      path: '/tokens/termsheet',
      name: 'termsheet',
      component: require('@/pages/termsheet').default
    }
  ] 
});

