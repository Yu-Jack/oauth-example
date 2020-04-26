const DB = require("../../db");
const credential = require("../../config/credential");
const responseGenerator = require("../../lib/responseGenerator");
const validateAccessToken = (req, res, next) => {
    const {
        accessToken,
        clientId,
        clientSecret,
    } =  {...req.body}

    if (DB.hasAccessTokenItem(accessToken) === false)  {
        return res.json(responseGenerator(104));
    }

    if (DB.getAccessTokenItem(accessToken).clientId !== clientId) {
        return res.json(responseGenerator(101));
    }
    
    if (credential.get(clientId) !== clientSecret) {
        return res.json(responseGenerator(103));
    }

    next();
}

module.exports = {
    validateAccessToken   
}