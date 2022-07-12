const { PostController } = require('../controllers')
const { AuthenticateToken } = require('../middleware/auth')

module.exports = (app) => {
  app.get('/post', PostController.handleFind)
  app.post('/post/create', AuthenticateToken, PostController.handleCreate)
  app.get('/post/:id', PostController.handleFindOne)
  app.get('/post/delete/:id', AuthenticateToken, PostController.handleFindOneAndDelete)
}