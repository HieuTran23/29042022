const { SubPermissionRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error } = require("../utils/errorApp");

class SubPermissionService {
    constructor() {
        this.subPermissionRepository = new SubPermissionRepository
    }

    async create(data) {
        try {
            const createdSubPermission = await this.subPermissionRepository.create(data)
            return FormatData({createdSubPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async findByPermissionId(data) {
        try {
            const foundSubPermission = await this.subPermissionRepository.findAllByPermissionId(data)
            return FormatData({foundSubPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async updateById(data) {
        try {
            const updatedSubPermission = await this.subPermissionRepository.updateById(data)
            return FormatData({updatedSubPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async deleteById(data) {
        try {
            const deletedSubPermission = await this.subPermissionRepository.deleteById(data)
            return FormatData({deletedSubPermission})
        } catch (err) {
            throw new Api404Error(err)
        }
    }
}

module.exports = SubPermissionService