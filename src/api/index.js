import axios from "axios";
import store from "@/store";
const api = axios.create({
  baseURL: "https://nlstar.com/ru/api/catalog3/v1",
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log(
      "Код: ",
      error.status,
      "Сообщение: ",
      error.message ? error.message : "Внутрення ошибка сервера",
    );
    if (error.status === 404) {
      store.commit("setErrorHtml", error.response.data);
    }

    return Promise.reject(error);
  },
);

export const nlStarAPI = {
  async getMenuTags(cityId) {
    const { data } = await api.get(process.env.VUE_APP_API_MENUTAGS, {
      params: {
        city_id: cityId,
      },
    });
    return data;
  },
  async getDataCity(id) {
    const { data } = await api.get(process.env.VUE_APP_API_CITY, {
      params: {
        id,
      },
    });

    return data;
  },
  async getListCities(term, country = "ru") {
    const { data } = await api.get(process.env.VUE_APP_API_CITY, {
      params: {
        term,
        country,
      },
    });

    return data;
  },
  async getProducts(cityId, slug) {
    const { data } = await api.get(
      `${process.env.VUE_APP_API_MENUTAGS}/${slug}/`,
      {
        params: {
          city_id: cityId,
        },
      },
    );

    return data;
  },
};
