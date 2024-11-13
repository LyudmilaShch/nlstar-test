<template>
  <ul v-if="list" class="sidebar">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="sidebar__item"
      :class="{ sidebar__item_active: activeItem === item.slug }"
      @click="select([item.slug, index])"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    subcategories: {
      type: Array,
      required: true,
    },
  },
  emits: ["select"],
  data() {
    return {
      activeItem: "",
    };
  },
  computed: {
    list() {
      return this.subcategories?.length >= 2
        ? [{ name: "Все продукты" }, ...this.subcategories]
        : null;
    },
  },
  mounted() {
    if (this.list) {
      this.loadSelectedItem();
    }
  },
  methods: {
    select(data) {
      this.$emit("select", data);
      this.activeItem = data[0];
    },
    loadSelectedItem() {
      if (this.$route.params.subslug) {
        this.activeItem = this.$route.params.subslug;
      } else {
        this.activeItem = this.list[0].slug;
      }
    },
  },
};
</script>

<style scoped src="./Sidebar.css"></style>
