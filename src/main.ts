import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { THEMES } from "./shared/constants";

document.querySelector("html")?.setAttribute("data-theme", THEMES[0]);

createApp(App).mount("#app");
