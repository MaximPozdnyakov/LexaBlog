import authService from "../../services/authService";

const state = {
  user: {},
  isAuthorized: false,
  isUserLoaded: false,
};

const actions = {
  async getAuthorizedUser({ commit }) {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = await authService.getAuthorizedUser();
      if (!userData.isError) {
        commit("setUser", userData.user);
      } else {
        localStorage.removeItem("token");
      }
    }
    commit("userLoaded");
  },
  async register({ commit, dispatch }, payload) {
    commit("userNotLoaded");
    const userData = await authService.register(payload);
    if (!userData.isError) {
      localStorage.setItem("token", userData.token);
      commit("setUser", userData.user);
      return true;
    } else {
      dispatch("messages/createMessage", userData.err, { root: true });
      commit("userLoaded");
      return false;
    }
  },
  async login({ commit, dispatch }, payload) {
    commit("userNotLoaded");
    const userData = await authService.login(payload);
    if (!userData.isError) {
      localStorage.setItem("token", userData.token);
      commit("setUser", userData.user);
      return true;
    } else {
      dispatch("messages/createMessage", userData.err, { root: true });
      commit("userLoaded");
      return false;
    }
  },
  async logout({ commit }) {
    commit("userNotLoaded");
    const logoutData = await authService.logout();
    localStorage.removeItem("token");
    commit("logout");
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
