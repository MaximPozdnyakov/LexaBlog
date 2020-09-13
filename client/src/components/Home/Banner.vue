<template>
  <div id="banner-wrapper">
    <div id="banner" class="box container">
      <div class="row">
        <div class="col-7 col-12-medium">
          <h2>Hi! This is Lexa!</h2>
          <p>It's blog made on Vue js</p>
        </div>
        <div class="col-5 col-12-medium">
          <ul>
            <li>
              <router-link to="/posts">
                <a class="button large icon solid fa-arrow-circle-right">All posts</a>
              </router-link>
            </li>
            <li>
              <router-link :to="isAuthorized ? '/posts/your' : '/login'">
                <a
                  class="button alt large icon solid fa-question-circle"
                >{{ isAuthorized ? 'Your posts' : 'Login' }}</a>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Banner",
  computed: {
    ...mapState("auth", ["isAuthorized"]),
  },
};
</script>

<style scoped>
@media screen and (min-width: 768px) and (max-width: 991.98px) {
  #banner {
    width: 90%;
  }
}
</style>