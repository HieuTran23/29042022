const { BadRequestError } = require("../../utils/errorApp");
const { RoleModel } = require("../models");

class RoleRepository{
    async create({name, isActive, subPermissions}) {
        try{
            const role = new RoleModel({
                name,
                isActive, 
                subPermissions
            })
            const createdRole = await role.save()
            return createdRole
        } catch(err) {
            return new BadRequestError('Cannot create new role')
        }
    }

    async find(){
        try{
            const foundRoles = await RoleModel.find()
            return foundRoles
        } catch(err) {
            return new BadRequestError('Cannot find roles')
        }
    }

    async findById({roleId}){
        try {
            const foundTag = await RoleModel.findById({_id: roleId})
            return foundTag
        } catch(err) {
            return new BadRequestError('Cannot find this role')
        }
    }

    async updateById({ roleId, name, isActive, subPermissions}){
        try{
            const updatedRole = await RoleModel.updateOne({_id: roleId}, {name, isActive, subPermissions})
            return updatedRole
        } catch(err) {
            return new BadRequestError('Cannot update this role')
        }
    }

    async deleteById({roleId}) {
        try {
            const deletedRole = await RoleModel.findByIdAndDelete(roleId)
            return deletedRole
        } catch(err) {
            return new BadRequestError('Cannot delete this role')
        }
    }
}

module.exports = RoleRepository