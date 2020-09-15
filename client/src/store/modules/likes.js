import likeService from "../../services/likeService";

const state = {
  likes: {},
  isLikesLoaded: false,
};

const getters = {
  ratingByComment: (state) => (commentId) => {
    const commentLikes = state.likes.filter(
      (like) => like.commentId === commentId
    );
    return commentLikes.reduce((rating, like) => {
      if (like.attitude) {
        return rating + 1;
      } else {
        return rating - 1;
      }
    }, 0);
  },
  isUserLikeComment: (state) => (userId, commentId) => {
    const commentLike = state.likes.find(
      (like) => like.authorId === userId && like.commentId === commentId
    );
    if (!commentLike) {
      return "none";
    } else {
      return commentLike.attitude;
    }
  },
  likeIdByCommentAndOwner: (state) => (userId, commentId) => {
    return state.likes.find(
      (like) => like.authorId === userId && like.commentId === commentId
    )._id;
  },
};

const actions = {
  async fetchLikes({ commit }) {
    const likeData = await likeService.fetchLikes();
    commit("setLikes", likeData);
    commit("likesLoaded");
  },
  async createLike({ commit }, payload) {
    commit("addLike", payload);
    const likeData = await likeService.createLike(payload);
  },
  async updateLike({ commit }, { payload, _id }) {
    commit("updateLike", { payload, _id });
    const likeData = await likeService.updateLike(payload, _id);
  },
  async deleteLike({ commit }, _id) {
    commit("deleteLike", _id);
    const deleteData = await likeService.deleteLike(_id);
  },
};

const mutations = {
  setLikes(state, likes) {
    state.likes = likes;
  },
  addLike(state, like) {
    state.likes.push(like);
  },
  updateLike(state, { payload, _id }) {
    state.likes = state.likes.map((like) => {
      if (like._id === _id) {
        let updatedLike = like;
        console.log("updatedLike", updatedLike);
        updatedLike.attitude = payload.attitude;
        return updatedLike;
      }
      return like;
    });
  },
  deleteLike(state, _id) {
    state.likes = state.likes.filter((like) => like._id !== _id);
  },
  likesLoaded(state) {
    state.isLikesLoaded = true;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
