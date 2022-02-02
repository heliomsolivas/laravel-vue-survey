import { createStore } from "vuex";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
  },
  getters: {},
  actions: {
    logout({ commit }) {
      commit("LOGOUT");
    },
    register({ commit }, user) {
      return fetch(`http://localhost:8000/api/register`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      }).then((res) =>
        res.json().then((res) => {
          commit("SET_USER", res);
          return res;
        })
      );
    },
  },
  mutations: {
    LOGOUT: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    SET_USER: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});

export default store;
