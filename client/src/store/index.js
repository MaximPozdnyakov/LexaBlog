import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import messages from "./modules/messages";
import posts from "./modules/posts";
import comments from "./modules/comments";
import likes from "./modules/likes";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    messages,
    posts,
    comments,
    likes,
  },
});
