const { ValidateAccessTokenSignature} = require('../utils')

const AuthenticateToken = async(req, res, next) => {
    try{
        const isAuthorized = await ValidateAccessTokenSignature(req);

        if(!isAuthorized)  return res.status(403).json({message: 'Not Authorized'})
        return next(); 
    } catch(err) {
        res.status(400).send({ message: "Invalid Token!" })
    }
      
}

module.exports = {
    AuthenticateToken
}