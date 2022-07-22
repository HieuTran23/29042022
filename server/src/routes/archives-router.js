const { ArchivesController } = require('../controllers')
const { AuthenticateToken } = require('../middleware/auth')

module.exports = (app) => {
  app.get('/archives/find_all_post_number', ArchivesController.handleFindPostsNumberByArchives)
}