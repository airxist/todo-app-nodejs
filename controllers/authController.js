const { StatusCodes } = require("http-status-codes");
const { badRequestError, unauthorizationError } = require("../errors");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const createTokenUser = require('../utils/createTokenUser');
const Token = require("../models/Token");
const { attachCookiesToResponse, createJWT } = require("../utils/jwt");
const crypto = require('crypto');

const register = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        throw new badRequestError('Please input your username and password')
    }
    // check username exists
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
        throw new badRequestError('please choose another username');
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const role = (await User.countDocuments({})) === 0 ? 'admin' : 'user';
    const client = {
        username,
        password,
        role
    }
    await User.create(client);
    res.status(StatusCodes.CREATED).json({ msg: 'Successful Registration' });
}

const login = async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password){
        throw new badRequestError('please your username and password');
    }

    const user = await User.findOne({ username });
    if(!user){
        throw new unauthorizationError('Invalid Credentials');
    }
    // crosscheck password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        throw new unauthorizationError('Invalid Credentials');
    }

    const tokenUser = createTokenUser(user);
    const token = createJWT({ payload: { user : tokenUser} });
    res.status(StatusCodes.OK).json({ user: tokenUser, token })

    // let refreshToken = '';
    // // check if token exist for user already
    // const existingToken = await Token.findOne({ user: user._id });
    // if(existingToken){
    //     const { isValid } = existingToken;
    //     if(!isValid){
    //         throw new unauthorizationError('Invalid Credentials');
    //     }
    //     refreshToken = existingToken.refreshToken;
    //     const jwtTokens = attachCookiesToResponse({ res, user: tokenUser, refreshToken})
    //     res.status(StatusCodes.OK).json({ user: tokenUser })
    //     return;
    // }
    
    // refreshToken = await crypto.randomBytes(50).toString('hex');
    // const ip = req.ip;
    // const userAgent = req.headers['user-agent'];
    // const userToken = { refreshToken, ip, userAgent, user: user._id };
    
    // await Token.create(userToken);
    // const jwtTokens = attachCookiesToResponse({ res, user: tokenUser, refreshToken})
    // res.status(StatusCodes.OK).json({ user: tokenUser });
}

const logout = async (req, res) => {
    const { username, role, userID } = req.user;
    await Token.findOneAndDelete({ user: userID });

    res.cookie('accessToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.cookie('refreshToken', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({ msg: "user logged out"})
}

const forgotPassword = (req, res) => {

}
const resetPassword = (req, res) => {

}

module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword
}