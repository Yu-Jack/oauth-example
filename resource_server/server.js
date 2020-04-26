global.appRoot = __dirname;
require("./process.env")

const PORT = 3000;
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const oauthRouter = require("./modules/oauth/oauthRouter")
const photoRouter = require("./modules/photo/photoRouter")
const authRouter = require("./modules/auth/authRouter")
const errorHandlerMiddleware = require("./middleware/errorHanlderMiddleware");
const session = require("./config/session")
const fs = require("fs")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session)

app.use("/vue-js", express.static(path.resolve(__dirname, "vue", "dist")))
app.use(express.static(path.resolve(__dirname, "public")))

app.use([photoRouter, oauthRouter, authRouter])

// simulate nginx setting
app.use((req, res, next) => {
    const content = fs.readFileSync(path.resolve(__dirname, "public", "index.html"));
    res.send(content.toString());
});

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`http://photo.example.net:${PORT}/`);
})

