const SubCategoryService = require('../services/subCategory-service')
const service = new SubCategoryService()

const handleCreate = async (req, res, next) => {
    const {id} = req.params
    const {subName, subDescription, isSubActive} = req.body

    try {
        const data = await service.create({categoryId: id, subName, subDescription, isSubActive})
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

const handleFindByCategoryId = async (req, res, next) => {
    const {id} = req.params

    try {
        const data = await service.findByCategoryId({categoryId: id})
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

const handleUpdateById = async (req, res, next) => {
    const {id, subId} = req.params
    const {subName, subDescription, isSubActive} = req.body

    try {
        const data = await service.updateById({subCategoryId: subId}, {subName, subDescription, isSubActive, categoryId: id})
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

const handleDeleteById = async (req, res, next) => {
    const {subId} = req.params

    try {
        const data = await service.deleteById(subId)
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

module.exports = {
    handleCreate,
    handleFindByCategoryId,
    handleUpdateById,
    handleDeleteById
}