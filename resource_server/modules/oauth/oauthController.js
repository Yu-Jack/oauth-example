const { getHmac } = require("../../lib/hmac");
const DB = require("../../db");
const credential = require("../../config/credential");
const responseGenerator = require("../../lib/responseGenerator");

const login = async (req, res, next) => {
    const {
        username,
        password,
        clientId,
        callbackUrl,
        checksum,
    } = {...req.body}

    if (getHmac(clientId, callbackUrl) !== checksum) {
        return next(responseGenerator(111));
    }
    
    
    if (username !== "123" && password !== "123") {
        return next(responseGenerator(102));
    }
    
    req.session.username = username;
    req.session.clientId = clientId;
    req.session.callbackUrl = callbackUrl;
    req.session.login = true;
    
    return res.json(responseGenerator(0));
}

const loginConfirm = async (req, res, next) => {

    const clientId = req.session.clientId;
    const callbackUrl = req.session.callbackUrl;
    const isConfirm = req.body.isConfirm;

    if (isConfirm === "false") {
        return res.redirect(`${callbackUrl}/error`);
    }


    const grantCode = require("randomstring").generate(10);
    DB.setGrantCodeItem(grantCode, {clientId, username: req.session.username});
    req.session.userInfo = {};
    req.session.userInfo[req.session.clientId] = grantCode;
    req.session.login = true;
    res.redirect(`${callbackUrl}?grantCode=${grantCode}&checksum=${getHmac(clientId, grantCode)}`)
}

const getAccessToken = async (req, res, next) => {
    const {
        grantCode,
        clientId,
        clientSecret,
    } =  {...req.body}

    if (DB.hasGrantCodeItem(grantCode) === false)  {
        return next(responseGenerator(100));
    }
    
    if (DB.getGrantCodeItem(grantCode).clientId !== clientId) {
        return next(responseGenerator(101));
    }
    
    if (credential.get(clientId) !== clientSecret) {
        return next(responseGenerator(103));
    }
    
    const accessToken = require("randomstring").generate(10);
    DB.setAccessTokenItem(accessToken, {clientId, username: DB.getGrantCodeItem(grantCode).username});

    res.json({
        ...responseGenerator(0),
        accessToken,
    })
}

const photo = async (req, res, next) => {
    const {
        accessToken 
    } = { ...req.body }

    if (!DB.hasAccessTokenItem(accessToken)) {
        return next(responseGenerator(104));
    }

    const username = DB.getAccessTokenItem(accessToken).username;
    const photos = DB.getPhotosPathArrayItem(username);
    
    res.json({
        ...responseGenerator(0),
        photos,
    })
}

module.exports = {
    login,
    loginConfirm,
    getAccessToken,
    photo,
}
