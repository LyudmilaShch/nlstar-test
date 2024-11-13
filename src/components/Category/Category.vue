<template>
  <div class="category">
    <div class="category__contain">
      <base-skeleton
        v-if="isLoading"
        class="category__head"
        height="44px"
        width="600px"
      />
      <div v-else class="category__head">
        <router-link :to="{ name: 'main' }" class="category__button-back" />
        <h2 class="category__title">{{ dataTag?.name }}</h2>
      </div>
      <div class="category__body">
        <Sidebar
          v-if="!isLoading"
          class="category__sidebar"
          :subcategories="dataTag?.children"
          @select="goToCategory($event)"
        />
        <div v-if="isLoadingProducts || isLoading" class="category__wrapper">
          <base-skeleton v-for="index in 8" :key="index" height="494px" />
        </div>
        <div v-else-if="productsData?.length" class="category__wrapper">
          <CategoryCard
            v-for="(product, index) in productsData"
            :key="index"
            :data="product"
          />
        </div>
        <div v-else class="category__empty-list center-flex">
          <div>Список пуст</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import CategoryCard from "@/components/CategoryCard/CategoryCard.vue";

export default {
  name: "Category",
  components: { CategoryCard, Sidebar },
  data() {
    return {
      productsData: null,
      isLoadingProducts: false,
    };
  },
  computed: {
    ...mapState(["menuTags", "isLoading"]),
    ...mapGetters(["getIdCity"]),
    tags() {
      return this.menuTags;
    },
    dataTag() {
      return this.tags.find((item) => item.slug === this.$route.params.slug);
    },
  },
  mounted() {
    this.loadProducts();
  },
  methods: {
    ...mapActions(["getProducts"]),
    async goToCategory(category) {
      const [slug] = category;
      if (slug) {
        await this.$router.push({
          name: "categories",
          params: {
            slug: this.$route.params.slug,
            subslug: slug,
          },
        });
      } else {
        await this.$router.push({
          name: "categories",
          params: {
            slug: this.$route.params.slug,
          },
        });
      }
      await this.loadProducts();
    },
    async loadProducts() {
      this.isLoadingProducts = true;
      const { products } = await this.getProducts({
        cityId: this.getIdCity,
        slug: this.$route.params.subslug || this.$route.params.slug,
      });
      this.productsData = products;
      this.isLoadingProducts = false;
    },
  },
};
</script>

<style scoped src="./Category.css"></style>
