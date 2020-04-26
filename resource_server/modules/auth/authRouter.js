const express = require("express");
const router = express.Router();
const authController = require("./authController");
const wrap = require("../../lib/controllerWrapper");

router.post("/api/login", wrap(authController.login));
router.post("/api/login/check", wrap(authController.loginCheck));

module.exports = router;