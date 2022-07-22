const PostService = require('../services/archives-service')
const service = new PostService()

const handleFindPostsNumberByArchives = async (req, res, next) => {
    try {
        const data = await service.findPostsNumberByArchives()
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleFindPostsNumberByArchives
}