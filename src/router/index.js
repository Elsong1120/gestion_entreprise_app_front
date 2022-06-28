import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import store from "@/store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",

    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/dashboard/profilecompany",
    name: "Profilecompany",
    meta: {
      requiresAuth: true,
    },
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profilecompany.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isLoggin || !store.state.profileCompleted) {
      next({ name: "Home" });
      console.log(from.path);
    } else {
      next();
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
});
export default router;
