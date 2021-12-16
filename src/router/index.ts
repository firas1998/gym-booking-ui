import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import CreateUser from '../views/CreateUser.vue';
import MyBookings from '../views/MyBookings.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/create-user",
    name: "CreateUser",
    component: CreateUser
  },
  {
    path: "/my-bookings",
    name: "MyBookings",
    component: MyBookings
  },
  {
    path: "/photos",
    name: "Photos",
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
