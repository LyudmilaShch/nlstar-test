import { createStore } from "vuex";
import { nlStarAPI } from "@/api";

export default createStore({
  state() {
    return {
      menuTags: [],
      errorHtml: undefined,
      idCity: undefined,
      isLoading: false,
    };
  },
  mutations: {
    toggleIsLoading(state, bool) {
      state.isLoading = bool;
    },
    setIdCity(state, id) {
      state.idCity = id;
    },
    setMenuTags(state, tags) {
      state.menuTags = tags;
    },
    setErrorHtml(state, errorHtml) {
      state.errorHtml = errorHtml;
    },
  },
  getters: {
    getIdCity(state) {
      return state.idCity || +localStorage.getItem("idCity") || 1;
    },
  },
  actions: {
    writeIdCity({ commit }, id) {
      localStorage.setItem("idCity", id);
      commit("setIdCity", id);
    },
    async getMenuTags({ commit }, id) {
      commit("toggleIsLoading", true);
      const { tags } = await nlStarAPI.getMenuTags(id);
      commit("setMenuTags", tags);
      commit("toggleIsLoading", false);
    },
    async getDataCity(_, id) {
      return await nlStarAPI.getDataCity(id);
    },
    async getListCities(_, term) {
      return await nlStarAPI.getListCities(term);
    },
    async getProducts(_, { cityId, slug }) {
      return await nlStarAPI.getProducts(cityId, slug);
    },
  },
});
