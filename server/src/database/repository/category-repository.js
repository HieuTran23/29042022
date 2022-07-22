const { CategoryModel } = require('../models')
const { BadRequestError } = require('../../utils/errorApp')

class CategoryRepository {
    async create({ name, description, isActive}) {
        try {
            const category = new CategoryModel({
                name,
                description,
                isActive
            })
            const createdCategory = await category.save()
            return createdCategory
        }catch (err) {
            return new BadRequestError('Cannot create new category')
        }
    }

    async find(){
        try {
            const foundCategories = await CategoryModel.find() 
            return foundCategories
        } catch (err) {
            return new BadRequestError('Cannot find categories')
        }
    }

    async findById({ categoryId}){
        try{
            const foundCategory = await CategoryModel.findById({_id: categoryId})
            return foundCategory
        } catch (err) {
            return new BadRequestError('Cannot find category')
        }
    }

    async update({ categoryId, name, description, isActive}){
        try {
            const updatedCategory = await CategoryModel.findByIdAndUpdate({_id: categoryId}, {name, description, isActive})
            return updatedCategory
        } catch (err) {
            return new BadRequestError('Cannot update this category')
        }
    }

    async updateActive({ categoryId, isActive}) {
        try {
            const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, {isActive})
            return updatedCategory
        } catch(err) {
            return new BadRequestError('Cannot update active field in this category')
        }
    }

    async deleteById({ categoryId}) {
        try {
            const deletedCategory = await CategoryModel.findByIdAndDelete({_id: categoryId})
            return deletedCategory
        } catch (err) {
            return new BadRequestError('Cannot delete this category')
        }
    }

    async findAllWithPostNumber(){
        try{
            const foundCategories = await CategoryModel.aggregate([
                {
                    $lookup: {
                        from: 'subcategories',
                        localField: '_id',
                        foreignField: 'categoryId',
                        as: 'subCategory'
                    },
                }, {
                    $unwind: {
                        path: "$subCategory",
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $lookup: {
                        from: 'posts',
                        localField: 'subCategory._id',
                        foreignField: 'subCategoryId',
                        as: 'posts'
                    }
                }, {
                    $project: {
                        name: 1,
                        subCategory: 1,
                        postsCount: {$size: '$posts'}
                    }
                }, {
                    $group: {
                        _id: '$_id',
                        name: { $first: '$name'},
                        subCategories: {
                            $push: {
                                postsCount: '$postsCount',
                                subCategory: '$subCategory'
                            }
                        },
                        postsCount: {$sum: '$postsCount'}
                    }
                }
            ])
            return foundCategories
        } catch(err) {
            console.log(err)
            return new BadRequestError('Cannot find categories')
        }
    }

    // async createSubCategory({ categoryId, subName, subDescription, isSubActive}) {
    //     try {
    //         const newSubCategory = {
    //             subName,
    //             subDescription,
    //             isSubActive
    //         }
    //         const createdSubCategory = await CategoryModel.updateOne({ _id: categoryId}, { $push: {subCategories: newSubCategory}})
    //         return createdSubCategory
    //     } catch (err) {
    //         return new BadRequestError('Cannot create new sub-category')
    //     }
    // }

    // async updateSubCategory({ categoryId, subCategoryId, subName, subDescription, isSubActive}){
    //     try {
    //         const updatedSubCategory = await CategoryModel.updateOne({ _id: categoryId, 'subCategories._id': subCategoryId}, {$set : {"subCategories.$.subName": subName, "subCategories.$.subDescription": subDescription, "subCategories.$.isSubActive": isSubActive}})
    //         return updatedSubCategory
    //     } catch (err) {
    //         return new BadRequestError('Cannot update this sub-category')
    //     }
    // }

    // async updateSubCategoryActive({categoryId, subCategoryId, isSubActive}) {
    //     try{
    //         const updatedSubCategory = await CategoryModel.findOneAndUpdate({_id: categoryId, 'subCategories._id': subCategoryId}, {$set: {"subCategories.$.isSubActive": isSubActive}})
    //         return updatedSubCategory
    //     } catch (err) {
    //         return new BadRequestError('Cannot update active field in this sub-category')
    //     }
    // }

    // async deleteSubCategory({ categoryId, subCategoryId}) {
    //     try {
    //         const updatedSubCategory = await CategoryModel.updateOne({_id: categoryId}, { "$pull": { "subCategories": { "_id": subCategoryId } }})
    //         return updatedSubCategory
    //     } catch(err) {
    //         return new BadRequestError('Cannot delete this sub-category')
    //     }
    // }
}

module.exports = CategoryRepository