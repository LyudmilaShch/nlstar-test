<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-if="errorHtml" v-html="errorHtml"></div>
  <!-- eslint-disable vue/no-v-html -->
  <div v-else>404</div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: {
    errorHtml: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
