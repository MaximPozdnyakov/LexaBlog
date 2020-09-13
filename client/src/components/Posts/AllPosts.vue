<template>
  <div id="features-wrapper">
    <div class="container">
      <div class="row postsWrapper">
        <Post v-for="post in posts" v-bind="post" :key="post._id"></Post>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Post from "./Post";

export default {
  name: "AllPosts",
  components: { Post },
  computed: {
    ...mapState("posts", ["posts"]),
  },
};
</script>

<style scoped>
.postsWrapper {
  align-items: stretch;
}
</style>
