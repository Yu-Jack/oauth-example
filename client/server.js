require("./process.env")
const PORT = process.env.port;
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("./config/session");
const photoRouter = require("./modules/photo/photoRouter")
const loginRouter = require("./modules/login/loginRouter")
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session)

app.use("/vue-js", express.static(path.resolve(__dirname, "vue", "dist")))
app.use(express.static(path.resolve(__dirname, "public")))

app.use([photoRouter, loginRouter])

// simulate nginx setting
app.use((req, res, next) => {
    const content = fs.readFileSync(path.resolve(__dirname, "public", "index.html"))
    res.send(content.toString())
})

app.listen(PORT, () => {
    console.log(`http://printer.example.com:${PORT}/`);
})