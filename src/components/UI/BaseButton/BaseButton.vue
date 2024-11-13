<template>
  <div class="base-button" :class="{ 'base-button_active': !disabled }">
    <button
      class="base-button__submit"
      :disabled="disabled"
      @click="$emit('click')"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "Кнопка",
    },
  },
  emits: ["click"],
};
</script>

<style scoped src="./BaseButton.css"></style>
