const { StatusCodes } = require('http-status-codes');
const { badRequestError, unauthorizationError } = require('../errors');
const { isTokenValid, attachCookiesToResponse } = require('../utils/jwt');
const Token = require('../models/Token');


const authentication = async (req, res, next) => {
    const { accessToken, refreshToken } = req.signedCookies;
    try {
        if (accessToken) {
            const {payload} = isTokenValid(accessToken);
            req.user = payload.user
            return next();
        }
        
        const  {payload}  = isTokenValid(refreshToken);

        const existingToken = await Token.findOne({
            refreshToken: payload.refreshToken,
            user: payload.user.userID
        })
        if (!existingToken || !existingToken?.isValid) {
            throw new unauthorizationError('Invalid Credential')
        }
        req.user = payload.user;
        attachCookiesToResponse({ res, user: payload.user, refreshToken: existingToken.refreshToken})
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Authentication Invalid"})
    }
}

// const requireAuth = async (req, res, next) => {
//     const authHead = req.headers.authorization;

//     if(!authHead || !authHead.startsWith("Bearer")) {
//         throw new unauthorizationError("Authentication Invalid");
//     }

//     const token = authHead.split(' ')[1];

//     try {
//         const payload = isTokenValid(token);
//         console.log(payload);
//         req.user = payload.payload.user;
//         next();
//     } catch (error) {
//         throw new unauthorizationError('Authentication Invalid')
//     }
// }

module.exports = {
    authentication,
    // requireAuth
}