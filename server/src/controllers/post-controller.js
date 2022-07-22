const PostService = require('../services/post-service')
const FindPostFactory = require('./post/find')
const service = new PostService()

const handleCreate = async (req, res, next) => {
    const {title, metaTitle, content, summary, links, files, image, subCategoryId, tagIds} = req.body
    
    try{
        const data = await service.create({title, metaTitle, content, summary, links, files, image, username: req.user.username, subCategoryId, tagIds})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleFind = async (req, res, next) => {
    const { number, page, filter } = req.query

    try{
        const findPostFactory = new FindPostFactory()
        const data = await findPostFactory.find({number: number, page: page}, filter)
        res.json(data)
    }catch (err) {
        next(err)
    }
}

const handleFindOne = async (req, res, next) => {
    const postId = req.params.id

    try {
        const data = await service.findOne({postId: postId})
        return res.json(data)
    } catch (err){
        next(err)
    }
}

const handleFindOneAndDelete = async (req, res, next) => {
    const postId = req.params.id
    const username = req.user.username

    try {
        const data = await service.findOneAndDelete({postId: postId, username: username})
        return res.json(data)
    } catch(err){
        next(err)
    }
}



module.exports  = {
    handleCreate,
    handleFind,
    handleFindOne,
    handleFindOneAndDelete
}