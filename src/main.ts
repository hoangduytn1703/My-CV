import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./core/router";
import "./chatgpt.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).mount("#app");
