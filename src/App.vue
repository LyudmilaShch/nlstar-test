<template>
  <ErrorPage v-if="errorHtml" :error-html="errorHtml" />
  <div v-else>
    <Header />
    <router-view />
  </div>
</template>

<script>
import { Header } from "@/components";
import ErrorPage from "@/views/ErrorPage/ErrorPage.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  components: {
    ErrorPage,
    Header,
  },
  computed: {
    ...mapState(["errorHtml"]),
    ...mapGetters({
      idCity: "getIdCity",
    }),
  },
  watch: {
    idCity(v, v2) {
      if (v === v2) return;

      this.setMenuTags([]);
      this.getMenuTags(v);
    },
  },
  mounted() {
    this.writeIdCity(this.idCity);
    this.getMenuTags(this.idCity);
  },
  methods: {
    ...mapActions(["writeIdCity", "getMenuTags"]),
    ...mapMutations(["setMenuTags"]),
  },
};
</script>

<style></style>
