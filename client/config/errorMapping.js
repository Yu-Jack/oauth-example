const errorMapping = new Map();

errorMapping.set(0, "success");
errorMapping.set(111, "wrong checksm");
errorMapping.set(401, "not login");
errorMapping.set(500, "failed to get access token");
errorMapping.set(501, "failed to get photos");

module.exports = errorMapping