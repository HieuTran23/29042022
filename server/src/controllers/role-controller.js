const RoleService = require('../services/role-service')
const service = new RoleService()


const handleCreate = async (req, res, next) => {
    const {name, isActive, subPermissions} = req.body 

    try{
        const data = await service.create({name, isActive, subPermissions})
        return res.json(data)
    } catch(err) {
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
    const { id} = req.params

    try {
        const data = await service.findById({roleId: id})
        return res.json(data)
    } catch(err) {
        next(err)
    }
}

const handleUpdateById = async (req, res, next) => {
    const {id} = req.params
    const { name, isActive, subPermissions} = req.body

    try {
        const data = await service.updateById({roleId: id, name, isActive, subPermissions})
        return res.json(data)
    } catch (err) {
        next(err)
    }
}

const handleDeleteById = async (req, res, next) => {
    const {id} = req.params

    try {
        const data = await service.deleteById({roleId: id})
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
    handleDeleteById
}