const user = {
  state: {
    selectedUser: null,
  },
  getters: {
    selectedUser: (state) => {
      if (!state.selectedUser) {
        const testUser = {
          username: "testUser",
          id: 999,
        };
        return testUser;
      }
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
