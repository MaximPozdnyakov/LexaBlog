import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import Toasted from "vue-toasted";
Vue.use(Toasted);

import VTooltip from "v-tooltip";
Vue.use(VTooltip);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
