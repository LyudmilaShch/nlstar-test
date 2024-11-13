<template>
  <section class="categories">
    <div class="categories__contain">
      <h2 class="categories__title">Категории товаров</h2>
      <div v-if="isLoading" class="categories__list">
        <base-skeleton v-for="index in 8" :key="index" height="171px" />
      </div>
      <div v-else-if="menuTags.length" class="categories__list">
        <PromoCard
          v-for="item in menuTags"
          :key="item.id"
          class="categories__item"
          :title="item.name"
          :slug="item.slug"
          :image="item.image"
          :text-color="item.text_color"
        />
      </div>
      <div v-else>Категории не найдены</div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import PromoCard from "./ProductCard/ProductCard.vue";

export default {
  name: "ProductCategories",
  components: { PromoCard },
  data() {
    return {};
  },
  computed: {
    ...mapState(["menuTags", "isLoading"]),
  },
};
</script>

<style scoped src="./ProductCategories.css"></style>
