const { UserModel} = require('../models')
const { Api404Error, STATUS_CODES} = require('../../utils/errorApp')


class UserRepository {
    async create({ username, password, email, firstName, lastName}){   
        try{
            const user = new UserModel({
                username,
                password,
                email,
                fullName: {
                    firstName,
                    lastName
                }
            })
            const createdUser = await user.save();
            return createdUser;
        } catch(err){
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot create new user')
        }
    }

    async findOne({username}){
        try{
            const foundUser = await UserModel.findOne({ username: username});
            return foundUser;
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find user')
        }
    }

    async findOneAndRemovePassword({username}){
        try{
            const foundUser = await UserModel.findOne({ username: username}, '-password');
            return foundUser;
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find user')
        }
    }
}

module.exports = UserRepository;