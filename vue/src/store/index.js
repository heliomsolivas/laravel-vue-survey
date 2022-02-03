import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "Teste Teste",
    slug: "teste-teste",
    status: "draft",
    image: null,
    description: "Description of teste",
    created_at: "2021-01-01 18:00:00",
    updated_at: "2021-01-01 18:00:00",
    expire_date: "2021-01-31 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            {
              uuid: "nf4inf943nf",
              text: "USA",
            },
            {
              uuid: "fewf2342",
              text: "BRA",
            },
          ],
        },
      },
    ],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tmpSurveys],
  },
  getters: {},
  actions: {
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("LOGOUT");
        return response;
      });
    },

    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("SET_USER", data);
        return data;
      });
    },

    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("SET_USER", data);
        return data;
      });
    },
  },
  mutations: {
    LOGOUT: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
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
