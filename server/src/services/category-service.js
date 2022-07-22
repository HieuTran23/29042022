const { CategoryRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error } = require("../utils/errorApp");

class CategoryService{
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async create(data){
        const { name, description, isActive} = data

        try {
            const createdCategory = await this.categoryRepository.create({name, description, isActive})
            return FormatData({createdCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async find(){
        try{
            const foundCategories = await this.categoryRepository.find()
            return FormatData({foundCategories})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async findById(data){
        const { categoryId } = data

        try {
            const foundCategory = await this.categoryRepository.findById({ categoryId})
            return FormatData({foundCategory})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async updateById(data){
        const { categoryId, name, description, isActive} = data

        try {
            const updatedCategory = await this.categoryRepository.update({ categoryId, name, description, isActive})
            return FormatData({updatedCategory})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async updateActive(data){
        const { categoryId, isActive} = data

        try {
            const updatedCategory = await this.categoryRepository.updateActive({ categoryId, isActive})
            return FormatData({updatedCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async deleteById(data){
        const { categoryId } = data

        try{
            const deletedCategory = await this.categoryRepository.deleteById({ categoryId})
            return FormatData({ deletedCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async createSubCategory(data) {
        const { categoryId, subName, subDescription, isSubActive} = data

        try {
            const createdSubCategory = await this.categoryRepository.createSubCategory({ categoryId, subName, subDescription, isSubActive})
            return FormatData({ createdSubCategory})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async findAllWithPostNumber(){
        try {
            const foundCategories = await this.categoryRepository.findAllWithPostNumber()
            return FormatData({foundCategories})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    // async updateSubCategory(data){
    //     const { categoryId, subCategoryId, subName, subDescription, isSubActive} = data

    //     try {
    //         const updatedSubCategory = await this.categoryRepository.updateSubCategory({ categoryId, subCategoryId, subName, subDescription, isSubActive})
    //         return FormatData({ updatedSubCategory})
    //     } catch (err) {
    //         throw new Api404Error(err)
    //     }
    // }

    // async updatedSubCategoryActive(data) {
    //     const {categoryId, subCategoryId, isSubActive} = data

    //     try {
    //         const updatedSubCategory = await this.categoryRepository.updateSubCategoryActive({ categoryId, subCategoryId, isSubActive})
    //         return FormatData({ updatedSubCategory})
    //     } catch (err) {
    //         throw new Api404Error(err)
    //     }
    // }

    // async deleteSubCategory(data){
    //     const {categoryId, subCategoryId} = data

    //     try {
    //         const deletedSubCategory = await this.categoryRepository.deleteSubCategory({ categoryId, subCategoryId})
    //         return FormatData({ deletedSubCategory})
    //     } catch(err){
    //         throw new Api404Error(err)
    //     }
    // }
}

module.exports = CategoryService