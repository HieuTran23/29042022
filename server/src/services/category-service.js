const { CategoryRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error, BadRequestError } = require("../utils/errorApp");

class CategoryService{
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async create(data){
        const { name, description} = data

        try {
            const createdCategory = await this.categoryRepository.create({name, description})
            return FormatData({createdCategory})
        } catch (err) {
            throw new Api404Error('Data not found', err)
        }
    }

    async find(){
        try{
            const foundCategory = await this.categoryRepository.find()
            return FormatData({foundCategory})
        } catch(err) {
            throw new Api404Error('Data not found', err)
        }
    }

    async findById(data){
        const { categoryId } = data

        try {
            const foundCategory = await this.categoryRepository.findById({ categoryId})
            return FormatData({foundCategory})
        } catch(err) {
            throw new Api404Error('Data not found', err)
        }
    }

    async updateById(data){
        const { categoryId, name, description} = data

        try {
            const updatedCategory = await this.categoryRepository.update({ categoryId, name, description})
            return FormatData({updatedCategory})
        } catch(err) {
            throw new Api404Error('Data not found', err)
        }
    }

    async deleteById(data){
        const { categoryId } = data

        try{
            const deletedCategory = await this.categoryRepository.deleteById({ categoryId})
            return FormatData({ deletedCategory})
        } catch (err) {
            throw new Api404Error('Data not found', err)
        }
    }

    async createSubCategory(data) {
        const { categoryId, subName, subDescription} = data

        try {
            const createdSubCategory = await this.categoryRepository.createSubCategory({ categoryId, subName, subDescription})
            return FormatData({ createdSubCategory})
        } catch (err) {
            throw new Api404Error('Data not found', err)
        }
    }

    async updateSubCategory(data){
        const { categoryId, subCategoryId, subName, subDescription} = data

        try {
            const updatedSubCategory = await this.categoryRepository.updateSubCategory({ categoryId, subCategoryId, subName, subDescription})
            return FormatData({ updatedSubCategory})
        } catch (err) {
            throw new Api404Error('Data not found', err)
        }
    }

    async deleteSubCategory(data){
        const {categoryId, subCategoryId} = data

        try {
            const deletedSubCategory = await this.categoryRepository.deleteSubCategory({ categoryId, subCategoryId})
            return FormatData({ deletedSubCategory})
        } catch(err){
            throw new Api404Error('Data not found', err)
        }
    }
}

module.exports = CategoryService