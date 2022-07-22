const { UserModel} = require('../models')
const { BadRequestError} = require('../../utils/errorApp')

 
class UserRepository {
    async create(create){
        const { username, password, role, firstName, lastName, email} = create

        try{
            const user = new UserModel({
                username,
                password,
                role,
                profile: {
                    fullName: {
                        firstName: firstName,
                        lastName: lastName
                    },
                    contact: {
                        email: email
                    }
                }
            })
            const createdUser = await user.save();
            return createdUser;
        } catch(err){
            return new BadRequestError('Cannot create new user')
        }
    }

    async findOne(filter){
        const {username} = filter

        try{
            const foundUser = await UserModel.findOne({ username: username});
            return foundUser;
        } catch (err) {
            return new BadRequestError('Cannot find user')
        }
    }

    async findOneAndRemovePassword(filter){
        const {username} = filter

        try{
            const foundUser = await UserModel.findOne({ username: username}, '-password');
            return foundUser;
        } catch (err) {
            return new BadRequestError('Cannot find user')
        }
    }
}

module.exports = UserRepository;