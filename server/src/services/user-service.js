const { UserRepository, TokenRepository } = require('../database')
const { Api404Error, BadRequestError } = require('../utils/errorApp')
const { RefreshAccessToken, FormatData, ValidatePassword, GenerateAccessToken, GenerateRefreshToken, HashPassword } = require('../utils')

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.tokenRepository = new TokenRepository();
    }

    //User
    async signUp(create) {
        const { username, password, firstName, lastName, email } = create;

        try {
            //Check User
            if (await this.userRepository.findOne({username})) return new BadRequestError('username already exists')

            const hashPassword = await HashPassword(password)
            const createdUser = await this.userRepository.create({ username, password: hashPassword, email, firstName, lastName })
            return FormatData({ createdUser })
        } catch (err) {
            throw new Api404Error(err)
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
            throw new Api404Error(err)
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
            throw new Api404Error(err)
        }
    }

    async token(refreshToken) {
        if (!await this.tokenRepository.findOneRefreshToken(refreshToken)) return FormatData(null)

        try {
            const accessToken = await RefreshAccessToken(refreshToken)
            return FormatData({accessToken})
        }
        catch (err) {
            throw new Api404Error(err)
        }
    }

    //Admin 
    async create(create) {
        const { username, password, role, firstName, lastName, email } = create;

        try {
            const hashPassword = await HashPassword(password)
            const createdUser = await this.userRepository.create({username, password: hashPassword, role, firstName, lastName, email})
            return FormatData({createdUser})
        } catch (err) {
            throw new Api404Error(err)
        }
    }
}

module.exports = UserService