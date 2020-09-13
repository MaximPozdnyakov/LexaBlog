import postService from "../../services/postService";

const state = {
  posts: {},
  isPostsLoaded: false,
};

const actions = {
  async fetchPosts({ commit }) {
    const postData = await postService.fetchPosts();
    commit("setPosts", postData);
    commit("postsLoaded");
  },
  async createPost({ commit, dispatch }, payload) {
    commit("postsNotLoaded");
    const postData = await postService.createPost(payload);
    console.log("postData", postData);
    if (!postData.isError) {
      commit("addPost", postData);
      commit("postsLoaded");
      return true;
    } else {
      dispatch("messages/createMessage", postData.err, { root: true });
      commit("postsLoaded");
      return false;
    }
  },
  async updatePost({ commit, dispatch }, payload) {
    commit("postsNotLoaded");
    const postData = await postService.updatePost(payload);
    console.log("postData", postData);
    if (!postData.isError) {
      commit("updatePost", postData.post);
      commit("postsLoaded");
      return true;
    } else {
      dispatch("messages/createMessage", postData.err, { root: true });
      commit("postsLoaded");
      return false;
    }
  },
  async deletePost({ commit }, _id) {
    commit("postsNotLoaded");
    const deleteData = await postService.deletePost(_id);
    commit("deletePost");
    commit("postsLoaded");
  },
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  addPost(state, post) {
    state.posts.push(post);
  },
  updatePost(state, updatedPost) {
    state.posts.map((post) => {
      if (post._id === updatedPost._id) {
        return updatedPost;
      }
      return post;
    });
  },
  deletePost(state, _id) {
    state.posts.map((post) => {
      if (post._id !== _id) {
        return post;
      }
    });
  },
  postsNotLoaded(state) {
    state.isPostsLoaded = false;
  },
  postsLoaded(state) {
    state.isPostsLoaded = true;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
