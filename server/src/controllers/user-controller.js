const UserService = require('../services/user-service')
const service = new UserService()

const handleSignUp = async (req, res, next) => {
    try {
        const data = await service.signUp(req.body)
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleSignIn = async (req, res, next) => {
    try { 
        const data = await service.signIn(req.body)
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleSignOut = async (req, res, next) => {
    try {
        const data = await service.signOut(req.body)
        return res.json(data)
    } catch (err){
        next(err)
    }
}

const handleToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken
        const accessToken = await service.token(refreshToken)
        return res.json(accessToken)
    } catch (err) {
        next(err)
    }
}

//Admin
const handleCreate = async (req, res, next) => {
    try {
        const data = await service.create(req.body)
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

module.exports = {
    handleCreate,
    handleSignUp,
    handleSignIn,
    handleToken,
    handleSignOut
}