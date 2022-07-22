const TagService = require('../services/tag-service')
const service = new TagService()

const handleCreate = async (req, res, next) => {
    const {name, isActive} = req.body

    try{
        const data = await service.create({name, isActive})
        return res.json(data)
    } catch (err){
        next(err)
    }
}

const handleFind = async (req, res, next) => {
    try {
        const data = await service.find()
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleFindById = async (req, res, next) => {
    const {id} = req.params

    try {
        const data = await service.findById({tagId: id})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleUpdateById = async (req, res, next) => {
    const {id} = req.params
    const {name, isActive} = req.body

    try{
        const data = await service.updateById({tagId: id, name, isActive})
        return res.json(data)
    } catch(err) {
        next(err)
    }
}

const handleDeleteById = async (req, res, next) => {
    const{id} = req.params

    try{
        const data = await service.deleteById({tagId: id})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleFindWithPostNumber = async (req, res, next) => {
    try {
        const data = await service.findWithPostNumber()
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleCreate,
    handleFind,
    handleFindById,
    handleUpdateById,
    handleDeleteById,
    handleFindWithPostNumber
}