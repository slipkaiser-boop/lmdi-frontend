import { createApp } from "vue";
import "@/assets/main.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import Aura from "@primevue/themes/aura";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
    },
  },
});
app.use(router);
app.mount("#app");
// teste