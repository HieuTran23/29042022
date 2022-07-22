const { TagRepository} = require('../database');
const { FormatData } = require('../utils');
const { Api404Error } = require('../utils/errorApp');

class TagService{
    constructor() {
        this.tagRepository = new TagRepository();
    }

    async create(data) {
        const {name, isActive} = data
        try {
            const createdTag = await this.tagRepository.create({name, isActive})
            return FormatData({createdTag})
        } catch (err){
            throw new Api404Error(err)
        }
    }

    async find() {
        try {
            const foundTags = await this.tagRepository.find()
            return FormatData({foundTags})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async findById(data) {
        const {tagId} = data

        try{
            const foundTag = await this.tagRepository.findById({tagId})
            return FormatData({foundTag})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async updateById(data) {
        const {tagId, name, isActive} = data

        try{
            const updatedTag = await this.tagRepository.updateById({tagId, name, isActive })
            return FormatData({updatedTag})
        } catch (err) {
            throw new Api404Error(err)
        }
    }

    async deleteById(data) {
        const {tagId} = data

        try {
            const deletedTag = await this.tagRepository.deleteById({tagId})
            return FormatData({deletedTag})
        } catch(err) {
            throw new Api404Error(err)
        }
    }

    async findWithPostNumber() {
        try{
            const foundTags = await this.tagRepository.findWithPostNumber()
            return FormatData({foundTags})
        } catch (err) {
            throw new Api404Error(err)
        }
    }
}

module.exports = TagService