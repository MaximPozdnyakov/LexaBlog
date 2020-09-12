<template>
  <div id="header-wrapper">
    <header id="header" class="container">
      <!-- Logo -->
      <div id="logo">
        <h1>
          <router-link to="/">
            <a>Lexa</a>
          </router-link>
        </h1>
      </div>

      <!-- Nav -->
      <nav id="nav">
        <ul>
          <li :class="{ current: $route.path === '/' }">
            <router-link to="/">
              <a>Welcome</a>
            </router-link>
          </li>
          <li :class="{ current: $route.path === '/posts' }">
            <router-link to="/posts">
              <a>All Posts</a>
            </router-link>
          </li>
          <li v-if="isAuthorized" :class="{ current: $route.path === '/posts/your' }">
            <router-link to="/posts/your">
              <a>Your Posts</a>
            </router-link>
          </li>
          <li v-if="isAuthorized" :class="{ current: $route.path === '/posts/create' }">
            <router-link to="/posts/create">
              <a>Create Post</a>
            </router-link>
          </li>
          <li v-if="!isAuthorized" :class="{ current: $route.path === '/register' }">
            <router-link to="/register">
              <a>Register</a>
            </router-link>
          </li>
          <li v-if="!isAuthorized" :class="{ current: $route.path === '/login' }">
            <router-link to="/login">
              <a>Login</a>
            </router-link>
          </li>
          <li v-if="isAuthorized" @click="logoutHandle()">
            <router-link to="/">
              <a>Logout</a>
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async logoutHandle() {
      await this.logout();
      this.$router.go();
    },
  },
};
</script>
