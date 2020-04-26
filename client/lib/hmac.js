const credential = require("../config/credential");

module.exports = {
    getHmac: (clientId, data) => {
        if (!credential.has(clientId)) {
            throw new Error("Client ID not found.")
        }
        return require("crypto").createHmac("sha256", credential.get(clientId)).update(data).digest("hex");
    }
}