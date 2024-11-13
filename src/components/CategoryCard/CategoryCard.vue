<template>
  <div class="category-card">
    <img :src="data.main_image_thumb_300" alt="" class="category-card__image" />
    <div class="category-card__text-wrapper">
      <span class="category-card__text">{{ data.category.name }}</span>
      <h4 class="category-card__title">{{ data.present_name }}</h4>
      <span class="category-card__description">{{ data.comment_name }}</span>
      <span class="category-card__price">{{ `${data.price} ₽` }}</span>
    </div>

    <base-button
      :disabled="disabledBtn"
      class="categories__button"
      :text="disabledBtn ? 'Нет в наличии' : 'В корзину'"
    />
  </div>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    disabledBtn() {
      return !this.data.allowed || !this.data.available;
    },
  },
};
</script>

<style scoped src="./CategoryCard.css"></style>
