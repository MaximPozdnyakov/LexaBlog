import Vue from "vue";
import Router from "vue-router";

import Register from "@/components/Auth/Register";
import Login from "@/components/Auth/Login";
import Home from "@/components/Home/Home";
import CreatePost from "@/components/Posts/CreatePost";
import AllPosts from "@/components/Posts/AllPosts";
import YourPosts from "@/components/Posts/YourPosts";
import EditPost from "@/components/Posts/EditPost";
import PostPage from "@/components/Posts/PostPage";
import Page404 from "@/components/Utils/Page404";

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
    {
      path: "/posts/create",
      name: "createPost",
      component: CreatePost,
      beforeEnter: (to, from, next) => {
        isAuthorized() ? next() : next("/");
      },
    },
    {
      path: "/posts/edit/:postId",
      name: "edit_post",
      component: EditPost,
      beforeEnter: (to, from, next) => {
        isAuthorized() ? next() : next("/");
      },
    },
    {
      path: "/posts/your",
      name: "yourPost",
      component: YourPosts,
      beforeEnter: (to, from, next) => {
        isAuthorized() ? next() : next("/");
      },
    },
    {
      path: "/posts/:postId",
      name: "post",
      component: PostPage,
    },
    {
      path: "/posts",
      name: "allPosts",
      component: AllPosts,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "*",
      name: "page404",
      component: Page404,
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
