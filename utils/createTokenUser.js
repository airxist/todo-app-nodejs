module.exports = createTokenUser = user => {
    return {
        username: user.username,
        role: user.role,
        userID: user._id
    }
}