<template>
  <router-link
    :to="{ name: 'categories', params: { slug } }"
    class="product-card"
  >
    <h3 class="product-card__title" :style="{ color: textColor }">
      {{ title }}
    </h3>
    <img :src="image" alt="" class="product-card__image" />
  </router-link>
</template>

<script>
export default {
  name: "PromoCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    textColor: {
      type: String,
      default: "#FFFFFF",
    },
    slug: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped src="./ProductCard.css"></style>
