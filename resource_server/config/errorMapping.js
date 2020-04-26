const errorMapping = new Map();

errorMapping.set(0, "success");
errorMapping.set(100, "wrong grant code");
errorMapping.set(101, "wrong clientid");
errorMapping.set(102, "wrong username and password");
errorMapping.set(103, "wrong clientSecret");
errorMapping.set(104, "wrong accessToken");
errorMapping.set(111, "wrong checksm");
errorMapping.set(401, "not login");

module.exports = errorMapping