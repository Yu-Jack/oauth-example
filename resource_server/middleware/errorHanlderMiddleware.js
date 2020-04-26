module.exports = (error, req, res, next) => {
    let response = {};

    if (error instanceof Error) {
        // unexcepted error
        response.status = 999;
        response.message = "System Error";
    } else {
        // custom error
        response = error
    }

    return res.json(response);
}