const { PermissionRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error } = require("../utils/errorApp");

class PermissionService{
    constructor() {
        this.permissionRepository = new PermissionRepository()
    }

    async create(data) {
        try {
            const createdPermission = await this.permissionRepository.create(data)
            return FormatData({createdPermission})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async find() {
        try {
            const foundPermissions = await this.permissionRepository.find()
            return FormatData({foundPermissions})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async findById(data) {
        try {
            const foundPermission = await this.permissionRepository.findById(data)
            return FormatData({foundPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async updateById(data) {
        try {
            const updatedPermission = await this.permissionRepository.updateById(data)
            return FormatData({updatedPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async deleteById(data) {
        try {
            const deletedPermission = await this.permissionRepository.deleteById(data)
            return FormatData({deletedPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async createSubPermission(data){
        try {
            const updatedPermission = await this.permissionRepository.createSubPermission(data)
            return FormatData({updatedPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async updateSubPermission(data) {
        try {
            const updatedPermission = await this.permissionRepository.updateSubPermission(data) 
            return FormatData({updatedPermission})
        } catch (err) {
            throw new Api404Error
        }
    }

    async deletedSubPermission(data) {
        try {
            const updatedPermission = await this.permissionRepository.deletedSubPermission(data)
            return FormatData({updatedPermission})
        } catch (err) {
            throw new Api404Error
        }
    }
}

module.exports = PermissionService