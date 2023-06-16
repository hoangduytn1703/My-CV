import { createRouter, createWebHistory } from "vue-router";
import Home from '../../view/home/index.vue';
import Login from '../../view/login/index.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory("/"),
  routes
})

export default router
