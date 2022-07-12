const { CategoryModel } = require('../models')
const { Api404Error, STATUS_CODES } = require('../../utils/errorApp')

class CategoryRepository {
    async create({ name, description}) {
        try {
            const category = new CategoryModel({
                name,
                description
            })
            const createdCategory = await category.save()
            return createdCategory
        }catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot create new category')
        }
    }

    async find(){
        try {
            const foundCategories = await CategoryModel.find() 
            return foundCategories
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find categories')
        }
    }

    async findById({ categoryId}){
        try{
            const foundCategory = await CategoryModel.findById({_id: categoryId})
            return foundCategory
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find category')
        }
    }

    async update({ categoryId, name, description}){
        try {
            const updatedCategory = await CategoryModel.findByIdAndUpdate({_id: categoryId}, {name, description})
            return updatedCategory
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot update this category')
        }
    }

    async deleteById({ categoryId}) {
        try {
            const deletedCategory = await CategoryModel.findByIdAndDelete({_id: categoryId})
            return deletedCategory
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot delete this category')
        }
    }

    async createSubCategory({ categoryId, subName, subDescription}) {
        try {
            const newSubCategory = {
                subName,
                subDescription
            }
            const createdSubCategory = await CategoryModel.updateOne({ _id: categoryId}, { $push: {subCategories: newSubCategory}})
            return createdSubCategory
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot create new sub-category')
        }
    }

    async updateSubCategory({ categoryId, subCategoryId, subName, subDescription}){
        try {
            const updatedSubCategory = await CategoryModel.updateOne({ _id: categoryId, 'subCategories._id': subCategoryId}, {$set : {"subCategories.$.subName": subName, "subCategories.$.subDescription": subDescription}})
            return updatedSubCategory
        } catch (err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot update this sub-category')
        }
    }

    async deleteSubCategory({ categoryId, subCategoryId}) {
        try {
            const updatedSubCategory = await CategoryModel.updateOne({_id: categoryId}, { "$pull": { "subCategories": { "_id": subCategoryId } }})
            return updatedSubCategory
        } catch(err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot delete this sub-category')
        }
    }
}

module.exports = CategoryRepository