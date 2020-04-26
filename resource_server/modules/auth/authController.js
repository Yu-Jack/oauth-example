const responseGenerator = require("../../lib/responseGenerator");

const login = async (req, res, next) => {
    const {
        username,
        password 
    } = req.body

    if (username !== "123" && password !== "123") {
        return next(responseGenerator(102))
    }

    req.session.login = true;
    req.session.username = username;

    res.json(responseGenerator(0));
}

const loginCheck = async (req, res, next) => {
    if (!req.session.login) {
        return next(responseGenerator(401))
    }
    
    res.json(responseGenerator(0));
}

module.exports = {
    login,
    loginCheck
}