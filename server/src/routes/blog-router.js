const { AuthenticateToken } = require('../middleware/auth')

const posts = [
    {
      username: 'Hieu',
      title: 'Post 1'
    },
    {
      username: 'Hoang',
      title: 'Post 2'
    }
  ]

module.exports = (app) => {
    app.get('/posts', AuthenticateToken, (req, res) => {
        res.json(posts)
    })
}