<template>
  <div class="posts">
    <div id="features-wrapper">
      <h1>Recent Posts</h1>
      <div class="container">
        <div class="row postsHolder">
          <Post v-for="post in recentPosts" v-bind="post" :key="post._id"></Post>
        </div>
      </div>
    </div>
    <router-link to="/posts">
      <a class="button icon solid">Find out more...</a>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Post from "./Post";

export default {
  name: "RecentPosts",
  components: { Post },
  computed: {
    ...mapState("posts", ["posts"]),
    recentPosts() {
      return this.posts.slice(0, 4);
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
</style>
