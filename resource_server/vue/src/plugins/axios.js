import axios from "axios";

const network = axios.create();
network.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

function install (Vue) {
    Vue.prototype.$axios = network
}

export default {
    install
}
