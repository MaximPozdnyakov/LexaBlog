<template>
  <loading
    v-if="!isUserLoaded || !isPostsLoaded || !isCommentsLoaded || !isLikesLoaded"
    :active="true"
    :is-full-page="true"
    color="#FF4486"
  ></loading>
  <div v-else id="root">
    <HamburgerMenu />
    <Menu />
    <main id="page-wrap">
      <Header />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import HamburgerMenu from "./components/Header/HamburgerMenu";
import "vue-loading-overlay/dist/vue-loading.css";

import { mapState, mapActions } from "vuex";

import Header from "./components/Header/Header";

export default {
  components: {
    Header,
    Loading,
    HamburgerMenu,
  },
  methods: {
    ...mapActions("auth", ["getAuthorizedUser"]),
    ...mapActions("posts", ["fetchPosts"]),
    ...mapActions("comments", ["fetchComments"]),
    ...mapActions("likes", ["fetchLikes"]),
    ...mapActions("messages", ["createMessage"]),
  },
  computed: {
    ...mapState("auth", ["isUserLoaded"]),
    ...mapState("posts", ["isPostsLoaded"]),
    ...mapState("likes", ["isLikesLoaded"]),
    ...mapState("comments", ["isCommentsLoaded"]),
  },
  created() {
    this.getAuthorizedUser();
    this.fetchComments();
    this.fetchPosts();
    this.fetchLikes();
  },
  watch: {
    "$route.fullPath"() {
      window.scrollTo(0, 0);
      this.createMessage("");
    },
  },
};
</script>

<style>
#header-wrapper {
  padding: 3rem 0;
}
</style>
