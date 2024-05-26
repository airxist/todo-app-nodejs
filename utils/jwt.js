require('dotenv').config();
const jwt = require('jsonwebtoken');

const createJWT = payload => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const isTokenValid = token => jwt.verify(token, process.env.JWT_SECRET);


const attachCookiesToResponse = ({ res, user, refreshToken }) => {
    const accessTokenJWT = createJWT({ payload: {user}});
    const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

    const shortExp = 1000 * 60 * 24;
    const longExp = shortExp * 30;

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        signed: true,
        secure: process.env.COOKIE_SECURE,
        expires: new Date(Date.now() + shortExp) // remember for one day
    })

    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        signed: true,
        secure: process.env.COOKIE_SECURE,
        expires: new Date(Date.now() + longExp) // remember for 30 days
    })
    
    return {
        accessToken: accessTokenJWT,
        refreshToken: refreshTokenJWT
    }
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}