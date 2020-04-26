const express = require("express");
const router = express.Router();
const photoController = require("./photoController");

router.post("/api/photo", photoController.photo);

module.exports = router;