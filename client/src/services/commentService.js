import { api, apiWithToken } from "./api";

export default {
  async fetchComments() {
    try {
      const comments = await api.get(`comments`);
      return comments.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async createComment(payload) {
    try {
      const newComment = await apiWithToken(localStorage.getItem("token")).post(
        `comments`,
        payload
      );
      return newComment.data;
    } catch (err) {
      return err.response.data;
    }
  },
};
