import commentService from "../../services/commentService";

const state = {
  comments: {},
  isCommentsLoaded: false,
};

const getters = {
  commentsByPostAndRoot: (state) => (postId, rootId) =>
    state.comments.filter(
      (comment) => comment.postId === postId && comment.parrentId === rootId
    ),
  numberOfCommentsByPost: (state) => (postId) =>
    state.comments.filter((comment) => comment.postId === postId).length,
};

const actions = {
  async fetchComments({ commit }) {
    const commentsData = await commentService.fetchComments();
    commit("setComments", commentsData);
    commit("commentsLoaded");
  },
  async createComment({ commit }, payload) {
    commit("addComment", payload);
    const commentData = await commentService.createComment(payload);
  },
};

const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
  addComment(state, comment) {
    state.comments.push(comment);
  },
  commentsLoaded(state) {
    state.isCommentsLoaded = true;
  },
};

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations,
};
