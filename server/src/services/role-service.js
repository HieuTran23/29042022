const { RoleRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error } = require("../utils/errorApp");

class RoleService{
    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async create(data) {
        try{
            const createdRole = await this.roleRepository.create(data)
            return FormatData({createdRole})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async find(){
        try{
            const foundRoles = await this.roleRepository.find()
            return FormatData({foundRoles})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async findById(data) {
        try {
            const foundRole = await this.roleRepository.findById(data)
            return FormatData({foundRole})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async updateById(data) {
        try {
            const updatedRole = await this.roleRepository.updateById(data)
            return FormatData({updatedRole})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async deleteById(data) {
        try {
            const deletedRole = await this.roleRepository.deleteById(data)
            return FormatData({deletedRole})
        } catch(err) {
            throw new Api404Error(err)
        }
    }
}

module.exports = RoleService