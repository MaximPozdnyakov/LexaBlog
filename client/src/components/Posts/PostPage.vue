<template>
  <Page404 v-if="!post" />
  <div id="main-wrapper" v-else>
    <div class="container">
      <div id="content">
        <!-- Content -->
        <article>
          <div class="postHeader">
            <h2>{{ post.title }}</h2>
            <div class="icons" v-if="user._id === post.authorId">
              <div>
                <router-link :to="{name: 'edit_post', params: { postId: $route.params.postId }}">
                  <i class="fas fa-pencil-alt"></i>
                </router-link>
              </div>
              <div>
                <router-link to="/posts">
                  <i class="fas fa-trash-alt" @click="deletePost($route.params.postId)"></i>
                </router-link>
              </div>
            </div>
          </div>
          <div class="info">
            <span class="owner">Made by {{ post.authorName }}</span>
            <span>{{ dataFormat }}</span>
          </div>
          <a class="image featured">
            <img :src="`api/image/${post.headerImg}`" alt />
          </a>
          <p>{{ post.body }}</p>
        </article>
        <CommentsWrapper />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import moment from "moment";

import CommentsWrapper from "@/components/Comments/CommentsWrapper";
import Page404 from "@/components/Utils/Page404";

export default {
  name: "PostPage",
  components: {
    CommentsWrapper,
    Page404,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    ...mapActions("posts", ["deletePost"]),
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("posts", ["posts"]),
    post() {
      return this.posts.find((post) => post._id === this.$route.params.postId);
    },
    dataFormat() {
      return moment(this.post.created_at).format("LL");
    },
  },
  // watch: {
  //   "$route.fullPath"() {
  //     this.$router.go();
  //   },
  // },
};
</script>

<style scoped>
article {
  margin-bottom: 3em;
}
#main-wrapper {
  padding: 40px 15px;
}
.postHeader {
  display: flex;
  justify-content: space-between;
}
h2 {
  line-height: 0em;
}
.info {
  font-weight: 600;
  margin-bottom: 1.5em;
  margin-top: -1.25em;
}
.image {
  max-width: 700px;
}
.owner {
  margin-right: 1.5em;
}
.icons {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  line-height: 0em;
  margin-top: -10px;
}
.edit-delete {
  display: flex;
  justify-content: space-between;
}
.fas {
  border-radius: 50px;
  font-size: 1.5em;
  padding: 0.5em;
  color: white;
}
.fa-pencil-alt {
  background: #007bff;
  margin-right: 1em;
}
.fa-trash-alt {
  background: #dc3545;
}
@media screen and (max-width: 736px) {
  .info {
    margin-bottom: 1em;
  }
}
@media screen and (max-width: 576px) {
  .fas {
    font-size: 1em;
  }
  .info {
    margin-top: 0;
  }
}
</style>
