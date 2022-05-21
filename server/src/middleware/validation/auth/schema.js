const Joi = require('joi');

const login = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(255)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(1024)
        .required()
        
})

const signup = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(6)
        .max(255)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(6)
        .max(1024)
        .required(),
    rePassword: Joi.ref('password'),
    firstName: Joi.string()
        .required(),
    lastName: Joi.string()
        .required(),
    email: Joi.string()
        .required()
        .email()
})

module.exports = {
    login,
    signup
};