<template>
  <div :class="`${isParrentRoot ? 'commentTree' : ''}`">
    <div class="commentBody">
      <div>
        <img width="60px" :src="authorAvatarSrc" alt />
      </div>
      <div class="bodyRight">
        <div class="commentHeader">
          <h1>{{comment.authorName}}</h1>
          <p class="date">{{ dataFormat }}</p>
        </div>
        <p>
          <a class="parrentName">{{ parrentName }}</a>
          {{comment.body}}
        </p>
        <div class="comment_footer">
          <!-- <svg
            v-tooltip="{ content: 'Please, login to do this', classes: isOpenTooltip, show: false }"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="#000"
            stroke-width="2"
            :fill="upVoteColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          >
            <path
              d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            />
          </svg>
          <svg
            v-tooltip="{ content: 'Please, login to do this', classes: isOpenTooltip }"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="#000"
            stroke-width="2"
            :fill="downVoteColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          >
            <path
              d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
          />-->
          <!-- </svg> -->
          <!-- <h1 :class="rating > 0 ? 'green' : rating === 0 ? '' : 'red'">{{rating}}</h1> -->
          <a v-if="isAuthorized" @click="isReplying = !isReplying">REPLY</a>
        </div>
        <AddComment :parentId="comment._id" v-if="isReplying" />
      </div>
    </div>
    <CommentTree
      v-for="commentChild in commentsChilds"
      :comment="commentChild"
      :key="commentChild._id"
    />
  </div>
</template> 

<script>
import moment from "moment";

import { mapState, mapGetters, mapActions } from "vuex";

import CommentTree from "./CommentTree";
import AddComment from "./AddComment";

export default {
  name: "CommentTree",
  props: ["comment"],
  components: { CommentTree, AddComment },
  data() {
    return {
      isReplying: false,
    };
  },
  computed: {
    ...mapState("auth", ["isAuthorized", "user"]),
    ...mapState("comments", ["comments"]),
    ...mapGetters("comments", ["commentsByPostAndRoot"]),
    // ...mapGetters("likes", [
    //   "ratingByComment",
    //   "isUserLikeComment",
    //   "likeIdByCommentAndOwner",
    // ]),
    isParrentRoot() {
      const parrentComment = this.comments.find(
        (com) => com._id === this.comment.parrentId
      );
      console.log("parrentComment", parrentComment);
      if (parrentComment) {
        return !parrentComment.parrentId;
      }
      return false;
    },
    parrentName() {
      const parrentComment = this.comments.find(
        (com) => com._id === this.comment.parrentId
      );
      if (parrentComment) {
        return parrentComment.authorName + ", ";
      }
      return "";
    },
    commentsChilds() {
      return this.commentsByPostAndRoot(
        this.$route.params.postId,
        this.comment._id
      );
    },
    // rating() {
    //   return this.ratingByComment(Number(this.comment.id));
    // },
    dataFormat() {
      return moment(this.comment.created_at).startOf("day").fromNow();
    },
    // isLiked() {
    //   return this.isUserLikeComment(this.user.id, this.comment.id);
    // },
    // upVoteColor() {
    //   return this.isLiked === true ? "#28a745" : "none";
    // },
    // downVoteColor() {
    //   return this.isLiked === false ? "#dc3545" : "none";
    // },
    isOpenTooltip() {
      return this.isAuthorized ? "noTooltip" : "tooltip";
    },
    authorAvatarSrc() {
      return `${
        this.comment.authorAvatar.slice(0, 4) === "http"
          ? this.comment.authorAvatar
          : `http://localhost:8000/api/image/${this.comment.authorAvatar}`
      }`;
    },
  },
  methods: {
    // ...mapActions("likes", ["addLike", "updateLike", "deleteLike"]),
    // like() {
    //   if (this.isLiked === "none") {
    //     this.addLike({
    //       like: {
    //         attitude: true,
    //         owner: this.user.id,
    //         comment_id: this.comment.id,
    //       },
    //       token: this.token,
    //     });
    //   } else if (!this.isLiked) {
    //     this.updateLike({
    //       like: {
    //         attitude: true,
    //       },
    //       likeId: this.likeIdByCommentAndOwner(this.user.id, this.comment.id),
    //       token: this.token,
    //     });
    //   } else {
    //     this.deleteLike({
    //       likeId: this.likeIdByCommentAndOwner(this.user.id, this.comment.id),
    //       token: this.token,
    //     });
    //   }
    // },
    // dislike() {
    //   if (this.isLiked === "none") {
    //     this.addLike({
    //       like: {
    //         attitude: false,
    //         owner: this.user.id,
    //         comment_id: this.comment.id,
    //       },
    //       token: this.token,
    //     });
    //   } else if (this.isLiked) {
    //     this.updateLike({
    //       like: {
    //         attitude: false,
    //       },
    //       likeId: this.likeIdByCommentAndOwner(this.user.id, this.comment.id),
    //       token: this.token,
    //     });
    //   } else {
    //     this.deleteLike({
    //       likeId: this.likeIdByCommentAndOwner(this.user.id, this.comment.id),
    //       token: this.token,
    //     });
    //   }
    // },
  },
};
</script>

<style>
.noTooltip {
  display: none;
}
.tooltip {
  background-color: #000 !important;
  border-radius: 1em !important;
  color: #fff !important;
  padding: 0.5em;
  font-weight: 600;
}
</style>

<style scoped>
svg {
  margin-right: 10px;
  cursor: pointer;
}
a {
  margin-left: 10px;
}
.green {
  color: #28a745;
}
.red {
  color: #dc3545;
}
.comment_footer {
  display: flex;
  align-items: center;
}
.date {
  margin-left: 1em;
}
.commentHeader {
  display: flex;
  margin-left: 10px;
}
.bodyRight {
  margin-left: 0.5em;
}
img {
  margin-top: 0.9em;
}
.commentBody {
  display: flex;
  margin: 0.75em 0;
}
.commentTree {
  margin-left: 2em;
}
p {
  margin-bottom: 0;
}
a {
  text-decoration: none;
  color: #606060;
  font-weight: 600;
  cursor: pointer;
}
</style>
