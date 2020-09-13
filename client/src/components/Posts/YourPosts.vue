<template>
  <div class="posts">
    <div id="features-wrapper">
      <h1 v-if="yourPosts.length === 0">
        You have no posts yet.
        <router-link to="/posts/create">
          <a>Create one!</a>
        </router-link>
      </h1>
      <div class="container" v-else>
        <div class="row postsHolder">
          <Post v-for="post in yourPosts" v-bind="post" :key="post._id"></Post>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Post from "./Post";

export default {
  name: "YourPosts",
  components: { Post },
  computed: {
    ...mapState("posts", ["posts"]),
    ...mapState("auth", ["user"]),
    yourPosts() {
      return this.posts.filter((post) => post.authorId === this.user._id);
    },
  },
};
</script>

<style scoped>
.postsHolder {
  align-items: stretch;
}
h1 {
  font-size: 3em;
  text-align: center;
  line-height: 2em;
  margin-bottom: 1.25em;
}
.button {
  margin: auto;
  text-align: center;
  line-height: 2em;
  padding: 0.5em 1em !important;
}
.posts {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#features-wrapper {
  padding-bottom: 1em;
}
h1 {
  font-size: 2em;
  font-weight: 600;
}
a {
  border-bottom: 2px solid #ff4486;
  padding-bottom: 5px;
  transition: all;
}
a:hover {
  color: #ff4486;
}
</style>
