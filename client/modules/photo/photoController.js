const log = require("../../lib/log");
const oauthServiceApi = require("../../service/api/oauthServiceApi");
const responseGenerator = require("../../lib/responseGenerator");

const photo = async (req, res, next) => {
    if (!req.session.login) {
        return res.json(responseGenerator(401))
    }
    
    let response = await oauthServiceApi.getPhotos({
        accessToken: req.session.accessToken,
    });

    if (response.status !== 0) {
        log(`failed to get photos: ${JSON.stringify(response)}`);
        return res.json(responseGenerator(501))
    }

    return res.json({
        ...responseGenerator(0),
        photos: response.photos
    });
}

module.exports = {
    photo,
}