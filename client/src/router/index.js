import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import CartPage from '../views/CartPage.vue';
import HistoryPage from '../views/HistoryPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path:'/history',
    name: 'HistoryPage',
    component: HistoryPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!localStorage.token && (to.path !== '/login' && to.path !== '/register')){
    next({ name: 'LoginPage' });
  } else if (localStorage.token && (to.path === '/login' || to.path === '/register')) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
