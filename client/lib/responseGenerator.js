const errorMapping = require("../config/errorMapping");

module.exports = (status) => {
    if (!errorMapping.has(status)) {
        return new Error(`Unkown status: ${status}`)
    }
    return {
        status,
        message: errorMapping.get(status)
    }
}