import "./.env.js";

import Vue from "vue"
import App from "@/App";
import router from "@/router"
import axios from "@/plugins/axios"

Vue.use(axios)

new Vue({
    el: "#app",
    router,
    render: h => h(App)
})