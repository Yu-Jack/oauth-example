const DB = new Map();

const GRANT_CODE_TABLE = "grant_code_table"
const ACCESS_TOKEN_TABLE = "access_token_table"
const PHOTO_TABLE = "photo_table"

DB.set(GRANT_CODE_TABLE, new Map());
DB.set(ACCESS_TOKEN_TABLE, new Map());
DB.set(PHOTO_TABLE, new Map());


// grantCode <--> clientId
const getGrantCodeItem = (grantCode) => {
    const map = DB.get(GRANT_CODE_TABLE);
    return map.get(grantCode);
}

const setGrantCodeItem = (grantCode, clientId) => {
    const map = DB.get(GRANT_CODE_TABLE);
    map.set(grantCode, clientId)
    DB.set(GRANT_CODE_TABLE, map)
}

const hasGrantCodeItem = (grantCode) => {
    const map = DB.get(GRANT_CODE_TABLE);
    return map.has(grantCode)
}

// accessToken <--> clientId
const getAccessTokenItem = (accessToken) => {
    const map = DB.get(ACCESS_TOKEN_TABLE);
    return map.get(accessToken);
}

const setAccessTokenItem = (accessToken, clientId) => {
    const map = DB.get(ACCESS_TOKEN_TABLE);
    map.set(accessToken, clientId)
    DB.set(ACCESS_TOKEN_TABLE, map)
}

const hasAccessTokenItem = (accessToken, clientId) => {
    const map = DB.get(ACCESS_TOKEN_TABLE);
    return map.has(accessToken);
}

const getPhotosPathArrayItem = (username) => {
    const map = DB.get(PHOTO_TABLE);
    return map.get(username);
}

const setPhotosPathArrayItem = (username, photoPath) => {
    const map = DB.get(PHOTO_TABLE);
    let photosPath = map.get(username) || [];
    photosPath.push(photoPath);
    map.set(username, photosPath)
    DB.set(PHOTO_TABLE, map)
}

module.exports = {
    getGrantCodeItem,
    setGrantCodeItem,
    hasGrantCodeItem,
    getAccessTokenItem,
    setAccessTokenItem,
    hasAccessTokenItem,
    getPhotosPathArrayItem,
    setPhotosPathArrayItem,
}