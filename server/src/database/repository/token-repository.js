const { TokenModel } = require('../models')
const { BadRequestError} = require('../../utils/errorApp')

class TokenRepository{
    async createAccessToken(refreshToken){
        try{
            const token = new TokenModel({
                token: refreshToken
            })

            const createdToken = await token.save();

            return createdToken;
        } catch (err){
            return new BadRequestError('Cannot create new token')
        }
    }

    async findOneRefreshToken(refreshToken){
        try{
            const foundToken = await TokenModel.findOne({token: refreshToken})
            return foundToken;
        } catch (err) {
            return new BadRequestError('Cannot find the token')
        }
    }

    async deleteRefreshToken(refreshToken){
        try{
            await TokenModel.deleteOne({token: refreshToken})
        } catch (err) {
            return new BadRequestError('Cannot delete the token')
        }
    }
}

module.exports = TokenRepository;