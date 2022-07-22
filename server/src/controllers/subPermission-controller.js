const SubPermission = require('../services/subPermission-service')
const service = new SubPermission

const handleCreate = async (req, res, next) => {
    const {id} = req.params
    const {subName, subDescription, isSubActive} = req.body

    try {
        const data = await service.create({subName, subDescription, isSubActive, permissionId: id})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleFindByPermissionId = async (req, res, next) => {
    const {id} = req.params

    try {
        const data = await service.findByPermissionId({permissionId: id})
        return res.json(data)
    } catch (err) {
        console.log(err)
        next (err)
    }
}

const handleUpdateById = async (req, res, next) => {
    const {id, subId} = req.params
    const {subName, subDescription, isSubActive} = req.body

    try {
        const data = await service.updateById({permissionId: id, subPermissionId: subId, subName, subDescription, isSubActive})
        return res.json(data)
    } catch (err) {
        next (err)
    }
}

const handleDeleteById = async (req, res, next) => {
    const {id, subId} = req.params

    try {
        const data = await service.deleteById({subPermissionId: subId})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleCreate,
    handleFindByPermissionId,
    handleUpdateById,
    handleDeleteById
}