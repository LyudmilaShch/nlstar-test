<template>
  <div class="header">
    <div class="header__contain contain">
      <base-skeleton v-if="cityIsLoading" height="24px" width="100px" />
      <button
        v-else-if="cityName"
        class="header__button center-flex"
        @click="toggleModal"
      >
        {{ cityName }}
      </button>
    </div>
    <base-modal :open="modalOpen" @close="toggleModal">
      <div>
        <h3 class="modal__title">Выбор населённого пункта:</h3>
        <div class="modal__body">
          <div class="modal__input-wrapper">
            <input
              v-model="keyWord"
              type="text"
              class="modal__input"
              :class="{ modal__input_active: listCities.length }"
              placeholder="Например, Санкт-петербург"
              @update:model-value="getList"
            />
            <div v-if="listCities.length" class="modal__list-wrapper">
              <button
                v-for="city in listCities"
                :key="city.id"
                class="modal__list-item"
                @click.prevent="changeLocation(city)"
              >
                {{ city.label }}
              </button>
            </div>
            <button
              v-if="checkClearInput"
              class="modal__input-clear"
              @click="clearInputArea"
            />
          </div>
          <base-button
            text="Подтвердить"
            :disabled="!selectedCity"
            @click="submit"
          />
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      cityName: "",
      modalOpen: false,
      keyWord: "",
      listCities: [],
      selectedCity: null,
      cityIsLoading: false,
    };
  },
  computed: {
    ...mapGetters(["getIdCity"]),
    checkClearInput() {
      return this.keyWord.length > 0;
    },
  },

  async mounted() {
    this.cityIsLoading = true;
    const { data } = await this.getDataCity(this.getIdCity);
    this.cityName = data.city;
    this.cityIsLoading = false;
  },
  methods: {
    ...mapActions(["getListCities", "getDataCity", "writeIdCity"]),
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },
    async getList(value) {
      this.keyWord = value.replace(/\d+/, "");

      if (value.length >= 3) {
        const { data } = await this.getListCities(value);
        this.listCities = data;
      } else {
        this.listCities = [];
      }
    },
    clearInputArea() {
      this.keyWord = "";
      this.listCities = [];
      this.selectedCity = null;
    },
    changeLocation(value) {
      this.listCities = [];
      this.selectedCity = value;
      this.keyWord = value.label;
    },
    submit() {
      this.cityName = this.selectedCity.city;
      this.writeIdCity(this.selectedCity.id);
      this.clearInputArea();
      this.modalOpen = false;
    },
  },
};
</script>

<style scoped src="./Header.css"></style>
