<template>
  <div>
    <h3 class="commentsHeader">Comments({{ numberOfCommentsByPost($route.params.postId) }}):</h3>
    <AddComment v-if="isAuthorized" :parrentId="null" />
    <h4 class="loginWarn" v-else>
      <router-link to="/login">
        <a id="login">Login</a>
      </router-link>to add a comment
    </h4>
    <div class="rootTree">
      <CommentTree v-for="comment in comments" :comment="comment" :key="comment._id" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import CommentTree from "./CommentTree";
import AddComment from "./AddComment";

export default {
  name: "CommentsWrapper",
  components: { AddComment, CommentTree },
  computed: {
    ...mapGetters("comments", [
      "commentsByPostAndRoot",
      "numberOfCommentsByPost",
    ]),
    ...mapState("auth", ["isAuthorized"]),
    comments() {
      return this.commentsByPostAndRoot(
        this.$route.params.postId,
        null
      ).reverse();
    },
  },
};
</script>

<style>
#login {
  border-bottom: 2px solid #ff4486;
  padding-bottom: 5px;
  margin-right: 0.3em;
  transition: all;
}
#login:hover {
  color: #ff4486;
}
</style>

<style scoped>
.commentsHeader {
  font-weight: 600;
  margin-bottom: 0;
}
.loginWarn {
  font-weight: 600;
}
</style>
