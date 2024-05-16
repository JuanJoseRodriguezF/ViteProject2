const { jsonResponse } = require("../lib/jsonResponse");
const getTokenFromHeader = require("./getTokenFromHeader");
const { verifyAccessToken } = require("./verifyTokens");

function authenticate(req, res, next){
    const token = getTokenFromHeader(req.headers);

    if(token){
        const decoded = verifyAccessToken(token);
        if(decoded){
            req.user = { ...decoded.user };
            next();
        }else{
            res.status(401).json(jsonResponse(401, {message: "No token provided", }));
        }
    }else{
        res.status(401).json(jsonResponse(401, {message: "No token provided", }));
    }
}

module.exports = authenticate;