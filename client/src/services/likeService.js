import { api, apiWithToken } from "./api";

export default {
  async fetchLikes() {
    try {
      const likes = await api.get(`likes`);
      return likes.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async createLike(payload) {
    try {
      const newLike = await apiWithToken(localStorage.getItem("token")).post(
        `likes`,
        payload
      );
      return newLike.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async updateLike(payload, _id) {
    try {
      const updatedLike = await apiWithToken(
        localStorage.getItem("token")
      ).patch(`likes/${_id}`, payload);
      return updatedLike.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async deleteLike(_id) {
    try {
      const deleteInfo = await apiWithToken(
        localStorage.getItem("token")
      ).delete(`likes/${_id}`);
      return deleteInfo.data;
    } catch (err) {
      return err.response.data;
    }
  },
};
