import { api, apiWithToken } from "./api";

export default {
  async fetchPosts() {
    try {
      const posts = await api.get(`posts`);
      return posts.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async createPost(payload) {
    try {
      const newPost = await apiWithToken(localStorage.getItem("token")).post(
        `posts`,
        payload
      );
      return newPost.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async updatePost(payload) {
    try {
      const updatedPost = await apiWithToken(
        localStorage.getItem("token")
      ).patch(`posts/${payload._id}`, payload);
      return updatedPost.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async deletePost(_id) {
    try {
      const deleteInfo = await apiWithToken(
        localStorage.getItem("token")
      ).delete(`posts/${_id}`, _id);
      return deleteInfo.data;
    } catch (err) {
      return err.response.data;
    }
  },
};
