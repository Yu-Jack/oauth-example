const express = require("express");
const router = express.Router();
const oauthController = require("./oauthController");
const oauthMiddleware = require("./oauthMiddleware");

const wrap = require("../../lib/controllerWrapper");

router.post("/api/oauth/login", wrap(oauthController.login));
router.post("/api/oauth/login/confirm", wrap(oauthController.loginConfirm));
router.post("/api/oauth/get-access-token", wrap(oauthController.getAccessToken));

// 以下所有 resources 都要接受此 middleware 的驗證
router.use("/api/oauth/resources", oauthMiddleware.validateAccessToken)
router.post("/api/oauth/resources/photos", wrap(oauthController.photo));

module.exports = router;