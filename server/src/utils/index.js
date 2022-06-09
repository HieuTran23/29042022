const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = require('../config')
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const { NotFoundError } = require('../utils/errorApp')

const FormatData = (data) => {
    if(!data) throw new NotFoundError('Data Not Found')
    return data
}

const HashPassword = async (password) => {
    return await argon2.hash(password)
}

const ValidatePassword = async (currentPassword, savedPassword) => {
    return await argon2.verify(savedPassword, currentPassword)
}

const GenerateAccessToken = (user) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
}

const GenerateRefreshToken = (user) => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET)
}

const ValidateAccessTokenSignature = (req) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token == null) return false
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET)
    req.user = payload
    return true
}

const RefreshAccessToken = (refreshToken) => {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    const accessToken = GenerateAccessToken({username: payload.username})
    return accessToken
}

module.exports = {
    FormatData,
    ValidatePassword,
    GenerateAccessToken,
    GenerateRefreshToken,
    ValidateAccessTokenSignature,
    RefreshAccessToken,
    HashPassword
}