import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "./styles/reset.css";
import "./styles/main.css";
import "./styles/fonts.css";
import { BaseSkeletonLoader, BaseModal, BaseButton } from "@/components/UI";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("BaseSkeleton", BaseSkeletonLoader);
app.component("BaseModal", BaseModal);
app.component("BaseButton", BaseButton);

app.mount("#app");
