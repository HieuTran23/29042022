const { BadRequestError } = require("../../utils/errorApp");
const { SubPermissionModel } = require("../models");

class SubPermissionRepository {
    async create(create){
        const { subName, subDescription, isSubActive, permissionId} = create

        try {
            const newSubPermission = new SubPermissionModel({
                subName,
                subDescription,
                isSubActive,
                permissionId
            })
            const createdSubPermission = await newSubPermission.save()
            return createdSubPermission
        } catch (err) {
            return new BadRequestError('Cannot create new sub permission')
        }
    }

    async findAllByPermissionId(filter) {
        const {permissionId} = filter

        try {
            const foundSubPermission = await SubPermissionModel.find({permission: permissionId})
            return foundSubPermission
        } catch (err) {
            return new BadRequestError('Cannot find sub permission in this permission')
        }
    }

    async updateById({subPermissionId, subName, subDescription, isSubActive, permissionId}){
        try {
            const updatedSubPermission = await SubPermissionModel.findByIdAndUpdate(subPermissionId, {subName, subDescription, isSubActive, permissionId})
            return updatedSubPermission
        } catch (err) {
            return new BadRequestError('Cannot update sub permission')
        }
    }

    async deleteById({subPermissionId}){
        try {
            const deletedSubPermission = await SubPermissionModel.findByIdAndDelete(subPermissionId)
            console.log(deletedSubPermission)
            return deletedSubPermission
        } catch (err) {
            return new BadRequestError('Cannot delete sub permission')
        }
    }
}

module.exports = SubPermissionRepository