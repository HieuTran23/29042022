const { BadRequestError } = require("../../utils/errorApp")
const { SubCategoryModel } = require("../models")

class SubCategoryRepository {
    async create(create) {
        const { subName, subDescription, isSubActive, categoryId} = create

        try {
            const newSubCategory = new SubCategoryModel({
                subName,
                subDescription,
                isSubActive,
                categoryId
            })
            const createdSubCategory = await newSubCategory.save()
            return createdSubCategory
        } catch (err) {
            return new BadRequestError('Cannot create new sub category')
        }
    }

    async findByCategoryId(filter) {
        try {
            const foundSubCategory = await SubCategoryModel.find(filter)
            return foundSubCategory
        } catch (err) {
            return new BadRequestError('Cannot find sub category')
        }
    }

    async updateById(filter, update) {
        const {subCategoryId} = filter

        try {
            const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(subCategoryId, update)
            return updatedSubCategory
        } catch (err) {
            console.log(err)
            return new BadRequestError('Cannot update this sub category')
        }
    }

    async deleteById(filter) {
        const {subCategoryId} = filter

        try {
            const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(subCategoryId)
            return deletedSubCategory
        } catch (err) {
            return new BadRequestError('Cannot delete this sub category')
        }
    }
}

module.exports = SubCategoryRepository