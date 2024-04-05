import { createApp } from "vue";
import App from "./App.vue";

import { Quasar, Notify } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";

import "quasar/dist/quasar.css";

const app = createApp(App);

app.use(Quasar, {
  plugins: {
    Notify
  }
})
app.mount("#app");