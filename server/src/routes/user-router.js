const { UserController } = require('../controllers')
const { loginValidation, signupValidation } = require('../middleware/validation/auth')

module.exports = (app) => {
    app.post('/register', signupValidation, UserController.handleSignUp)
    app.post('/login', loginValidation, UserController.handleSignIn)
    app.post('/token', UserController.handleToken)
    app.delete('/logout', UserController.handleSignOut)
    //Admin
    app.post('/admin/user/create', UserController.handleCreate)
}