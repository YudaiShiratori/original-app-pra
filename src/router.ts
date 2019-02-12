import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Idea from './views/Idea.vue';
import MakeIdea from './views/MakeIdea.vue';
import Signup from './views/auth/Signup.vue';
import Login from './views/auth/Login.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/idea',
      name: 'Idea',
      component: Idea,
    },
    {
      path: '/make-idea',
      name: 'MakeIdea',
      component: MakeIdea,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
