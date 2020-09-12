import authService from "../../services/authService";

const state = {
  user: {},
  isAuthorized: false,
  isUserLoaded: false,
};

const actions = {
  async getAuthorizedUser({ commit }) {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await authService.getAuthorizedUser();
        if (!userData.isError) {
          commit("setUser", userData);
        } else {
          localStorage.removeItem("token");
        }
      }
      commit("userLoaded");
    } catch (err) {}
  },
  async register({ commit, dispatch }, payload) {
    try {
      commit("userNotLoaded");
      const userData = await authService.register(payload);
      if (!userData.isError) {
        localStorage.setItem("token", userData.token);
        commit("setUser", userData.user);
        commit("userLoaded");
        return true;
      } else {
        dispatch("messages/createMessage", userData.err, { root: true });
        commit("userLoaded");
        return false;
      }
    } catch (err) {}
  },
  async login({ commit, dispatch }, payload) {
    try {
      commit("userNotLoaded");
      const userData = await authService.login(payload);
      console.log("userData", userData);
      if (!userData.isError) {
        localStorage.setItem("token", userData.token);
        commit("setUser", userData.user);
        commit("userLoaded");
        return true;
      } else {
        dispatch("messages/createMessage", userData.err, { root: true });
        commit("userLoaded");
        return false;
      }
    } catch (err) {}
  },
  async logout({ commit }) {
    try {
      commit("userNotLoaded");
      const logoutData = await authService.logout();
      localStorage.removeItem("token");
      commit("logout");
      commit("userLoaded");
    } catch (err) {}
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.isAuthorized = true;
  },
  logout(state) {
    state.user = {};
    state.isAuthorized = false;
  },
  userNotLoaded(state) {
    state.isUserLoaded = false;
  },
  userLoaded(state) {
    state.isUserLoaded = true;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
