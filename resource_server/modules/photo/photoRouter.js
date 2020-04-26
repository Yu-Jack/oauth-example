const express = require("express");
const router = express.Router();
const photoController = require("./photoController");
const path = require("path")
const multer  = require('multer')
const upload = multer({ dest: path.resolve(appRoot, "public", "upload") })

const wrap = require("../../lib/controllerWrapper");

router.post("/api/photos", wrap(photoController.photos));
router.post("/api/photos/upload", upload.single("photo"), wrap(photoController.photosUpload));

module.exports = router;