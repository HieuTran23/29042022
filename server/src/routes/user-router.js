const { UserController } = require('../controllers')
const { loginValidation, signupValidation } = require('../middleware/validation/auth')

module.exports = (app) => {
    app.post('/signup', signupValidation, UserController.handleCreateUser)
    app.post('/login', loginValidation, UserController.handleLogin)
    app.post('/token', UserController.handleToken)
    app.delete('/logout', UserController.handleLogout)
}