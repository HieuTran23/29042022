const { SubCategoryRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error } = require("../utils/errorApp");

class SubCategoryService {
    constructor() {
        this.subCategoryRepository = new SubCategoryRepository()
    }

    async create(create) {
        try {
            const createdSubCategory = await this.subCategoryRepository.create(create)
            return FormatData({createdSubCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async findByCategoryId(filter) {
        try {
            const foundSubCategory = await this.subCategoryRepository.findByCategoryId(filter)
            return FormatData({foundSubCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async updateById(filter, update) {
        const {subCategoryId} = filter

        try {
            const updatedSubCategory = await this.subCategoryRepository.updateById(filter, update)
            return FormatData({updatedSubCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async deleteById(filter) {
        try {
            const deletedSubCategory = await this.subCategoryRepository.deleteById(filter)
            return FormatData({deletedSubCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }
}

module.exports = SubCategoryService