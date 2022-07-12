const CategoryService = require('../services/category-service')
const service = new CategoryService()

const handleCreate = async (req, res, next) => {
    const {name, description} = req.body

    try {
        const data = await service.create({name, description})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleFind = async (req, res, next) => {
    try {
        const data = await service.find()
        return res.json(data)
    } catch(err) {
        next(err)
    }
}

const handleFindById = async (req, res, next) => {
    const { id } = req.params
    
    try{
        const data = await service.findById({categoryId: id})
        return res.json(data)
    } catch(err){
        next(err)
    }
}

const handleUpdateById = async (req, res, next) => {
    const {id } = req.params
    const {name, description} = req.body

    try{
        const data = await service.updateById({ categoryId: id, name, description})
        return res.json(data)
    } catch(err) {
        next(err)
    }
}

const handleDeleteById = async (req, res, next) => {
    const { id} = req.params

    try{
        const data = await service.deleteById({ categoryId: id})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleCreateSubCategory = async (req, res, next) => {
    const { id} = req.params
    const { subName, subDescription} = req.body

    try{
        const data = await service.createSubCategory({ categoryId: id, subName, subDescription})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleUpdateSubCategory = async (req, res, next) => {
    const {id, subId} = req.params
    const {subName, subDescription} = req.body

    try {
        const data = await service.updateSubCategory({ categoryId: id, subCategoryId: subId, subName, subDescription})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleDeleteSubCategory = async (req, res, next) => {
    const {id, subId} = req.params
    
    try{
        const data = await service.deleteSubCategory({categoryId: id, subCategoryId: subId})
        return res.json(data) 
    } catch(err) {
        next(err)
    }
}

module.exports = {
    handleCreate,
    handleFind,
    handleFindById,
    handleUpdateById,
    handleDeleteById,
    handleCreateSubCategory,
    handleUpdateSubCategory,
    handleDeleteSubCategory
}