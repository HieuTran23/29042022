const { BadRequestError } = require("../../utils/errorApp");
const { PermissionModel } = require("../models");

class PermissionRepository{
    async create({name, description, isActive}){
        try {
            const permission = new PermissionModel({
                name,
                description,
                isActive
            })
            const createdPermission = await permission.save()
            return createdPermission
        } catch(err) {
            return new BadRequestError('Cannot create new permission')
        }
    }

    async find(){
        try {
            const foundPermissions = await PermissionModel.find()
            return foundPermissions
        } catch(err) {
            return new BadRequestError('Cannot find permissions')
        }
    }

    async findById({permissionId}) {
        try{
            const foundPermission = await PermissionModel.findById(permissionId)
            return foundPermission
        } catch(err) {
            return new BadRequestError('Cannot find this permission')
        }
    }

    async updateById({permissionId, name, description, isActive}) {
        try{
            const updatedPermission = await PermissionModel.findByIdAndUpdate(permissionId, {name, description, isActive})
            return updatedPermission
        } catch (err) {
            return new BadRequestError('Cannot update this permission')
        }
    }

    async deleteById({permissionId}) {
        try{
            const deletedPermission = await PermissionModel.findByIdAndDelete(permissionId)
            return deletedPermission
        } catch(err) {
            return new BadRequestError('Cannot delete this permission')
        }
    }

    // async createSubPermission({ permissionId, subName, subDescription, isSubActive}) {
    //     try{
    //         const newSubPermission = {
    //             subName,
    //             subDescription,
    //             isSubActive
    //         }
    //         const updatedPermission = await PermissionModel.findByIdAndUpdate(permissionId, {$push: {subPermissions: newSubPermission}})
    //         return updatedPermission
    //     } catch (err) {
    //         return new BadRequestError('Cannot create new sub-permission in this permission')
    //     }
    // }

    // async updateSubPermission({ permissionId, subPermissionId, subName, subDescription, isSubActive}) {
    //     try{
    //         const updatedPermission = await PermissionModel.findOneAndUpdate({_id: permissionId, "subPermissions._id": subPermissionId}, {$set: {"subPermissions.$.subName": subName, "subPermissions.$.subDescription": subDescription, "subPermissions.$.isSubActive": isSubActive}})
    //         return updatedPermission
    //     } catch(err) {
    //         return new BadRequestError('Cannot update this sub-permission')
    //     }
    // }

    // async deletedSubPermission({ permissionId, subPermissionId}){
    //     try{
    //         const updatedPermission = await PermissionModel.findByIdAndUpdate(permissionId, {$pull: {"subPermissions": {_id: subPermissionId}}})
    //         return updatedPermission
    //     } catch (err) {
    //         return new BadRequestError('Cannot delete this sub-permission')
    //     }
    // }
}

module.exports = PermissionRepository