const UserService = require('../services/user-service')
const service = new UserService()

const handleCreateUser = async (req, res, next) => {
    try {
        const data = await service.SignUp(req.body)
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleLogin = async (req, res, next) => {
    try { 
        const data = await service.SignIn(req.body)
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleLogout = async (req, res, next) => {
    try {
        const data = await service.SignOut(req.body)
        return res.json(data)
    } catch (err){
        next(err)
    }
}

const handleToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken
        const accessToken = await service.Token(refreshToken)
        return res.json(accessToken)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleCreateUser,
    handleLogin,
    handleToken,
    handleLogout
}