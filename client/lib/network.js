const axios = require("axios");
const network = axios.create()

network.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

const post = (url, data) => {
    return network.post(url, data);
}

module.exports = {
    post,
}