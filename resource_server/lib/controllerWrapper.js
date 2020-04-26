const stackLevel = 2;
const log = (error) => {
    let detail = error.stack.split("at ")[stackLevel - 1].trim();
    const functionName = detail.split(" ")[0]
    let fileName = detail.split("/")[detail.split("/").length - 1];
    fileName = fileName.split(":")[0]
    console.log(`${fileName} - ${functionName}`, error);
};

const wrap = (fn) => { 
    return (...args) => {
        return fn(...args).catch((error) => {
            log(error);
            next(error);
        })
    };
}

module.exports = wrap;