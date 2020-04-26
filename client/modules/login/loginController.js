const log = require("../../lib/log");
const { getHmac } = require("../../lib/hmac");
const oauthServiceApi = require("../../service/api/oauthServiceApi");
const responseGenerator = require("../../lib/responseGenerator");

const index = async (req, res, next) => {
    const clientId = process.env.clientId;
    const callbackUrl = process.env.oauthCallbackUrl;
    const checksum = getHmac(clientId, callbackUrl);

    if (!req.session.login) {
        req.session.login = false;
    }

    res.json({
        ...responseGenerator(0),
        checksum,
        callbackUrl,
        clientId
    })
}

const callback = async (req, res, next) => {
    const clientId = process.env.clientId;
    const {
        grantCode,
        checksum
    } =  {...req.body}

    if (getHmac(clientId, grantCode) !== checksum) {
        return res.json(responseGenerator(111))
    }

    const response = await oauthServiceApi.getAccessToken({
        grantCode
    })

    if (response.status !== 0) {
        log(`failed to get access token: ${JSON.stringify(response)}`);
        return res.json(responseGenerator(500))
    }

    req.session.login = true;
    req.session.accessToken = response.accessToken;

    return res.json(responseGenerator(0))

}

const loginCheck = async (req, res) => {
    if (!req.session.login) {
        return res.json(responseGenerator(401))
    }
    
    res.json(responseGenerator(0))
}

module.exports = {
    index,
    callback,
    loginCheck,
}
