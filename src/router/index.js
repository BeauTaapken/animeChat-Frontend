import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Home
  },
  {
    path: "/webcamchat",
    name: "webcamchat",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/webcamchat.vue")
  },
  {
    path: "/animeandmanga",
    name: "animeandmanga",
    component: () => import("../views/AnimeAndManga.vue")
  },
  {
    path: "/textchat",
    name: "textchat",
    component: () => import("../views/textchat.vue")
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/users.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
