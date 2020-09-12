const state = {
  message: "",
};

const actions = {
  async createMessage({ commit }, message) {
    commit("setMessage", message);
  },
};

const mutations = {
  setMessage(state, message) {
    state.message = message;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
