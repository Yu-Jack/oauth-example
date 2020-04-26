const stackLevel = 3;

const log = (message) => {
    let detail = (new Error()).stack.split("at ")[stackLevel - 1].trim();
    const functionName = detail.split(" ")[0]
    let fileName = detail.split("/")[detail.split("/").length - 1];
    fileName = fileName.split(":")[0]
    console.log(`${fileName} - ${functionName}: %o`, message);
};

module.exports = log;