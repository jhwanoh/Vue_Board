import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "@/router";

createApp(App).use(router).mount("#app");
