const responseGenerator = require("../../lib/responseGenerator");
const DB = require("../../db");

const photos = async (req, res, next) => {
    const ptotos = DB.getPhotosPathArrayItem(req.session.username);
    res.json({
        ...responseGenerator(0),
        ptotos,
    })
}

const photosUpload = async (req, res, next) => {
    const photoUrl = `${process.env.PHOTO_URL}/upload/${req.file.filename}`
    DB.setPhotosPathArrayItem(req.session.username, photoUrl);
    res.json(responseGenerator(0))
}

module.exports = {
    photos,
    photosUpload,
}