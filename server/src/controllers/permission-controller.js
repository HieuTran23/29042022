const PermissionService = require('../services/permission-service')
const service = new PermissionService

const handleCreate = async (req, res, next) => {
    const {name, description, isActive} = req.body 

    try {
        const data = await service.create({name, description, isActive})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleFind = async (req, res, next) => {
    try {
        const data = await service.find()
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

const handleFindById = async (req, res, next) => {
    const {id} = req.params

    try {
        const data = await service.findById({permissionId: id})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleUpdateById = async (req, res, next) => {
    const {id} = req.params
    const {name, description, isActive} = req.body

    try {
        const data = await service.updateById({permissionId: id, name, description, isActive})
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

const handleDeleteById = async (req, res, next) => {
    const {id} = req.params
    
    try {
        const data = await service.deleteById({permissionId: id})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleCreateSubPermission = async (req, res, next) => {
    const {id} = req.params
    const {subName, subDescription, isSubActive} = req.body

    try {
        const data= await service.createSubPermission({permissionId: id, subName, subDescription, isSubActive})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleUpdateSubPermission = async (req, res, next) => {
    const {id, subId} = req.params
    const {subName, subDescription, isSubActive} = req.body

    try {
        const data = await service.updateSubPermission({permissionId: id, subPermissionId: subId, subName, subDescription,isSubActive})
        return res.json(data)
    } catch(err) {
        next(err)
    }
}

const handleDeleteSubPermission = async (req, res, next) => {
    const {id, subId} = req.params

    try {
        const data = await service.deletedSubPermission({permissionId: id, subPermissionId: subId})
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
    handleCreateSubPermission,
    handleUpdateSubPermission,
    handleDeleteSubPermission
}