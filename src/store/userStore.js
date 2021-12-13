const user = {
  state: {
    selectedUser: null,
  },
  getters: {
    selectedUser: (state) => {
      return state.selectedUser;
    },
  },
  mutations: {
    UPDATE_SELECTED_USER(state, user) {
      state.selectedUser = user;
    },
  },
  actions: {
    setSelectedUser({ commit }, payload) {
      commit("UPDATE_SELECTED_USER", payload);
    },
  },
};

export default user;
