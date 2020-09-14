<template>
  <Slide noOverlay right :closeOnNavigation="true" v-if="windowWidth <= 980">
    <li :class="{ current: $route.path === '/'}">
      <router-link to="/">
        <a>Welcome</a>
      </router-link>
    </li>
    <li :class="{ current: $route.path === '/posts'}">
      <router-link to="/posts">
        <a>All Posts</a>
      </router-link>
    </li>
    <li v-if="isAuthorized" :class="{ current: $route.path === '/posts/your'}">
      <router-link to="/posts/your">
        <a>Your Posts</a>
      </router-link>
    </li>
    <li v-if="isAuthorized" :class="{ current: $route.path === '/posts/create'}">
      <router-link to="/posts/create">
        <a>Create Post</a>
      </router-link>
    </li>
    <li v-if="!isAuthorized" :class="{ current: $route.path === '/register'}">
      <router-link to="/register">
        <a>Register</a>
      </router-link>
    </li>
    <li v-if="!isAuthorized" :class="{ current: $route.path === '/login'}">
      <router-link to="/login">
        <a>Login</a>
      </router-link>
    </li>
    <li v-if="isAuthorized" @click="logoutHandle()">
      <router-link to="/">
        <a>Logout</a>
      </router-link>
    </li>
  </Slide>
</template>

<script>
import { Slide } from "vue-burger-menu";
import { mapState, mapActions } from "vuex";

export default {
  name: "HamburgerMenu",
  components: { Slide },
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    async logoutHandle() {
      await this.logout();
      this.$router.go();
    },
  },
  data() {
    return {
      windowWidth: 0,
      isOpen: false,
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
};
</script>
<style>
.bm-burger-button {
  top: 3.5em;
  cursor: pointer;
  z-index: 1000;
  right: 15px !important;
}
@media screen and (max-width: 980px) and (min-width: 736px) {
  .bm-burger-button {
    top: 4em;
    right: 5% !important;
  }
}
</style>
<style scoped>
.current {
  text-decoration: underline;
}
a {
  color: white;
  text-decoration: none;
  font-weight: 600;
}
a:hover {
  text-decoration: underline;
}
</style>
