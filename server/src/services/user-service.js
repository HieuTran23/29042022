const { UserRepository, TokenRepository } = require('../database')
const { Api404Error, BadRequestError } = require('../utils/errorApp')
const { RefreshAccessToken, FormatData, ValidatePassword, GenerateAccessToken, GenerateRefreshToken, HashPassword } = require('../utils')

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.tokenRepository = new TokenRepository();
    }

    async signUp(data) {
        const { username, password, email, firstName, lastName } = data;

        if(await this.userRepository.findOne({username})) throw new BadRequestError('username already exists')

        try {
            const hashPassword = await HashPassword(password)
            const createdUser = await this.userRepository.create({ username, password: hashPassword, email, firstName, lastName })
            return FormatData({ createdUser })
        } catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }

    async signIn(data) {
        const {username, password} = data
        
        //Check exist data
        try {
            const foundUser = await this.userRepository.findOne({username})
            if (!foundUser) throw new Error()
            if (!await ValidatePassword(password, foundUser.password)) throw new Error()
        } catch (err){
            throw new BadRequestError('Incorrect username or password')
        }
        
        //Provide token
        try {
            const user = { username: username }
            const accessToken = await GenerateAccessToken(user)
            const refreshToken = await GenerateRefreshToken(user)
            const alreadyRefreshToken = await this.tokenRepository.findOneRefreshToken(refreshToken)
            if(!alreadyRefreshToken) await this.tokenRepository.createAccessToken(refreshToken)
            return FormatData({ username: username, accessToken: accessToken, refreshToken: refreshToken })
        } catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }

    async signOut(data) {
        const { refreshToken } = data
        //Check exist token
        if(!await this.tokenRepository.findOneRefreshToken(refreshToken)) return FormatData(null)

        try {
            await this.tokenRepository.deleteRefreshToken(refreshToken)
            return FormatData({message: 'log out'})
        } catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }

    async token(refreshToken) {
        if (!await this.tokenRepository.findOneRefreshToken(refreshToken)) return FormatData(null)

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