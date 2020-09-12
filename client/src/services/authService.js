import { api, apiWithToken } from "./api";

export default {
  async login(payload) {
    try {
      const user = await api.post(`auth/login`, payload);
      return user.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async register(payload) {
    try {
      const newUser = await api.post(`auth`, payload);
      return newUser.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async logout() {
    try {
      const logoutInfo = await apiWithToken(localStorage.getItem("token")).post(
        "auth/logout"
      );
      return logoutInfo.data;
    } catch (err) {
      return err.response.data;
    }
  },
  async getAuthorizedUser() {
    try {
      const user = await apiWithToken(localStorage.getItem("token")).get(
        "auth"
      );
      return user.data;
    } catch (err) {
      return err.response.data;
    }
  },
};
