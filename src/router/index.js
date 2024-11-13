import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../views/MainPage/MainPage.vue";
import CategoriesPage from "../views/CategoriesPage/CategoriesPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/categories/:slug/:subslug?",
    name: "categories",
    component: CategoriesPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("@/views/ErrorPage/ErrorPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

export default router;
