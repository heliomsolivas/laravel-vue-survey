import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 1,
    title: "Vue 3",
    slug: "vue-3",
    status: "draft",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png",
    description:
      "O Vue.js conta com uma arquitetura que pode ser adotada de forma incremental, e que foca na renderização declarativa e na composição de componentes. Funcionalidades avançadas necessárias para aplicações complexas (como encaminhamento, gestão de estados e automação de compilação) são oferecidas por meio de bibliotecas e pacotes de suporte mantidos oficialmente, sendo o Nuxt.js como uma das soluções mais populares.",
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
  {
    id: 2,
    title: "Vue 2",
    slug: "vue-2",
    status: "draft",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png",
    description:
      "O Vue.js conta com uma arquitetura que pode ser adotada de forma incremental, e que foca na renderização declarativa e na composição de componentes. Funcionalidades avançadas necessárias para aplicações complexas (como encaminhamento, gestão de estados e automação de compilação) são oferecidas por meio de bibliotecas e pacotes de suporte mantidos oficialmente, sendo o Nuxt.js como uma das soluções mais populares.",
    created_at: "2021-01-01 18:00:00",
    updated_at: "2021-01-01 18:00:00",
    expire_date: "2021-01-31 18:00:00",
    questions: [],
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
