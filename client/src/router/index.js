import Vue from "vue";
import Router from "vue-router";

import Register from "@/components/Auth/Register";
import Login from "@/components/Auth/Login";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register,
      beforeEnter: (to, from, next) => {
        !isAuthorized() ? next() : next("/");
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: (to, from, next) => {
        !isAuthorized() ? next() : next("/");
      },
    },
  ],
});

import store from "@/store/index";
function isAuthorized() {
  const { isAuthorized } = store.state.auth;
  if (isAuthorized) {
    return true;
  } else {
    return false;
  }
}
