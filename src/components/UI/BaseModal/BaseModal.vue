<template>
  <Teleport v-if="openModal" to="body">
    <div class="modal" :class="{ modal_close: animationClose }">
      <div class="modal__background" @click="closeModal" />

      <section class="modal__wrapper">
        <slot></slot>
        <button class="modal__close" @click="closeModal" />
      </section>
    </div>
  </Teleport>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  data() {
    return {
      openModal: false,
      animationClose: null,
    };
  },
  watch: {
    open(v) {
      document.body.classList.toggle("no-scroll");

      if (v) this.openModal = true;
      if (!v) {
        this.animationClose = true;

        setTimeout(() => {
          this.openModal = false;
          this.animationClose = false;
        }, 300);
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped src="./BaseModal.css"></style>
