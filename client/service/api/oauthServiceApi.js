const network = require("../../lib/network");
const credential = require("../../config/credential");

const oauthUrl = process.env.oauthUrl;
const clientId = process.env.clientId;

const _makeRequest = (url, data) => {
    data.clientId = clientId;
    data.clientSecret = credential.get(clientId);
    return network.post(url, data);
}

const getAccessToken = (data) => {
    return _makeRequest(`${oauthUrl}/api/oauth/get-access-token`, data);
}

const getPhotos = (data) => {
    return _makeRequest(`${oauthUrl}/api/oauth/resources/photos`, data);
}

module.exports = {
    getAccessToken,
    getPhotos
}