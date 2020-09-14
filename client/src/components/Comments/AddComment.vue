<template>
  <form class="addComment">
    <input
      :class="isTyping ? 'liveCommentOn' : 'liveCommentOff'"
      @focus="isTyping = !isTyping"
      placeholder="Live a comment"
      v-model="commentBody"
    />
    <div v-if="isTyping">
      <a class="cancel" @click="commentBody = ''; isTyping = !isTyping">CANCEL</a>
      <a
        :class="commentBody.length > 0 ? 'sendBtn' : 'sendBtn disableBg'"
        @click="sendMessage()"
      >SEND</a>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AddComment",
  props: ["parentId"],
  data() {
    return {
      isTyping: false,
      commentBody: "",
    };
  },
  methods: {
    ...mapActions("comments", ["createComment"]),
    sendMessage() {
      let parentId = null;
      if (this.parentId) {
        parentId = this.parentId;
      }
      this.createComment({
        body: this.commentBody,
        postId: this.$route.params.postId,
        parrentId: parentId,
        authorName: this.user.username,
        authorAvatar: `${
          this.user.avatar
            ? this.user.avatar
            : "https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png"
        }`,
        authorId: this.user._id,
      });
      this.commentBody = "";
      this.isTyping = !this.isTyping;
    },
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
};
</script>

<style scoped>
.liveCommentOff {
  border: none;
  border-bottom: 1px solid #606060;
  width: 300px;
  color: #000;
}
.liveCommentOn {
  border: none;
  border-bottom: 2px solid #000;
  width: 300px;
  color: #000;
  margin-bottom: 1em;
}
a {
  color: #606060;
  font-weight: 600;
  text-decoration: none;
  padding: 2em 2em 0 0;
  cursor: pointer;
}
.sendBtn {
  color: #ffffff;
  background-color: #007bff;
  padding: 0.5em 1em;
}
.disableBg {
  background: #cccccc;
}
</style>
