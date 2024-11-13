<template>
  <div :style="cssProps" class="skeleton-loader" />
</template>

<script>
export default {
  name: "BaseSkeletonLoader",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    borderRadius: {
      type: String,
      default: "5px",
    },
  },
  computed: {
    cssProps() {
      return {
        "--skeleton-width": this.width,
        "--skeleton-height": this.height,
        "--border-radius": this.borderRadius,
      };
    },
  },
};
</script>

<style scoped src="./BaseSkeletonLoader.css"></style>
