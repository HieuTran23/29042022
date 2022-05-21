const { login, signup } = require('./schema')
const { STATUS_CODES ,ValidationError, Api404Error } = require('../../../utils/errorApp')


const loginValidation = async(req, res, next) => {
    const data = await login.validate(req.body);
    try{
        if (data.error) {
            throw new ValidationError(data.error.details[0].message)
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }    
}

const signupValidation = async(req, res, next) => {
    const data = await signup.validate(req.body)
    try{
        if(data.error) {
            throw new ValidationError(data.error.details[0].message)
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    loginValidation,
    signupValidation
}