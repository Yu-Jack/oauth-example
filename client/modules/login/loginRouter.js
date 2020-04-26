const express = require("express");
const router = express.Router();
const loginController = require("./loginController");

const wrap = require("../../lib/controllerWrapper");

router.post("/api/oauth/init", wrap(loginController.index));
router.post("/api/oauth/callback", wrap(loginController.callback));
router.post("/api/login/check", wrap(loginController.loginCheck))

module.exports = router;