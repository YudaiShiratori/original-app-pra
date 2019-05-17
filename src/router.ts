import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ViewIdea from './views/ViewIdea.vue';
import NewIdea from '@/components/NewIdea.vue';
import Login from './views/auth/Login.vue';

import LandingPage from './views/LandingPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/lp',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      // path: '/view-idea/:id',
      path: '/view-idea/:uid',
      name: 'ViewIdea',
      component: ViewIdea,
    },
    {
      path: '/new-idea',
      name: 'NewIdea',
      component: NewIdea,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
