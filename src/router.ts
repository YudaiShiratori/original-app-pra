import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// import Idea from './views/Idea.vue';
import ViewIdea from './views/ViewIdea.vue';
import MakeIdea from './views/MakeIdea.vue';
import Signup from './views/auth/Signup.vue';
import Login from './views/auth/Login.vue';
import Pra from '@/components/Pra.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/view-idea/:id',
      name: 'ViewIdea',
      component: ViewIdea,
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
    {
      path: '/pra',
      name: 'Pra',
      component: Pra,
    },
  ],
});
