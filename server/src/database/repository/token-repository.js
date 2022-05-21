const { TokenModel } = require('../models')
const { Api404Error, STATUS_CODES} = require('../../utils/errorApp')

class TokenRepository{
    async CreateToken(refreshToken){
        try{
            const token = new TokenModel({
                token: refreshToken
            })

            const createdToken = await token.save();

            return createdToken;
        } catch (err){
            throw new Api404Error('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot create new token')
        }
    }

    async FindOneToken(refreshToken){
        try{
            const foundToken = await TokenModel.findOne({token: refreshToken})
            return foundToken;
        } catch (err) {
            throw new Api404Error('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find the token')
        }
    }

    async DeleteToken(refreshToken){
        try{
            await TokenModel.deleteOne({token: refreshToken})
        } catch (err) {
            throw new Api404Error('API Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot delete the token')
        }
    }
}

module.exports = TokenRepository;