const { UserRepository, TokenRepository } = require('../database')
const { Api404Error, NotFoundError, BadRequestError } = require('../utils/errorApp')
const { RefreshAccessToken, FormatData, ValidatePassword, GenerateAccessToken, GenerateRefreshToken, HashPassword } = require('../utils')

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.tokenRepository = new TokenRepository();
    }

    async SignUp(data) {
        const { username, password, email, firstName, lastName } = data;

        if(await this.userRepository.FindOneUser(username)) throw new BadRequestError('username already exists')

        try {
            const hashPassword = await HashPassword(password)
            const createdUser = await this.userRepository.CreateUser({ username, password: hashPassword, email, firstName, lastName })
            return FormatData({ createdUser })
        } catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }

    async SignIn(data) {
        const {username, password} = data
        //Check exist data
        try {
            const foundUser = await this.userRepository.FindOneUser(username)
            if (!foundUser) throw new Error()
            if (!await ValidatePassword(password, foundUser.password)) throw new Error()
        } catch (err){
            console.log(err)
            throw new BadRequestError('Incorrect username or password')
        }
        
        
        
        //Provide token
        try {
            const user = { username: username }
            const accessToken = await GenerateAccessToken(user)
            const refreshToken = await GenerateRefreshToken(user)
            const alreadyRefreshToken = await this.tokenRepository.FindOneToken(refreshToken)
            if(!alreadyRefreshToken) await this.tokenRepository.CreateToken(refreshToken)
            return FormatData({ username: username, accessToken: accessToken, refreshToken: refreshToken })
        } catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }

    async SignOut(data) {
        const { refreshToken } = data
        //Check exist token
        if(!await this.tokenRepository.FindOneToken(refreshToken)) return FormatData(null)

        try {
            await this.tokenRepository.DeleteToken(refreshToken)
            return FormatData({message: 'log out'})
        } catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }

    async Token(refreshToken) {
        if (!await this.tokenRepository.FindOneToken(refreshToken)) return FormatData(null)

        try {
            
            const accessToken = await RefreshAccessToken(refreshToken)
            return FormatData({accessToken})
        }
        catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }
}

module.exports = UserService