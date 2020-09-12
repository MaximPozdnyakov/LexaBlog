<template>
  <loading v-if="!isUserLoaded" :active="true" :is-full-page="true" color="#FF4486"></loading>
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
    ...mapActions("messages", ["createMessage"]),
  },
  computed: {
    ...mapState("auth", ["isUserLoaded"]),
  },
  async created() {
    await this.getAuthorizedUser();
  },
  watch: {
    "$route.fullPath"() {
      window.scrollTo(0, 0);
      this.createMessage("");
    },
  },
};
</script>
