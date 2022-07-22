const { TagModel} = require('../models')
const { BadRequestError} = require('../../utils/errorApp')

class TagRepository {
    async create({name, isActive}) {
        try{
            const tag = new TagModel({
                name,
                isActive
            })
            const createdTag = await tag.save()
            return createdTag
        } catch (err) {
            return new BadRequestError('Cannot create new tag')
        }
    }

    async find(){
        try{
            const foundTags = await TagModel.find()
            return foundTags
        } catch(err) {
            return new BadRequestError('Cannot find tags')
        }
    }

    async findById({ tagId}){
        try {
            const foundTag = await TagModel.findById({_id: tagId})
            return foundTag
        } catch(err) {
            return new BadRequestError('Cannot find this tag')
        }
    }

    async updateById({ tagId, name, isActive}) {
        try {
            const updatedTag = await TagModel.updateOne({_id: tagId}, {name, isActive})
            return updatedTag
        } catch (err) {
            return new BadRequestError('Cannot update this tag')
        }
    }

    async deleteById({tagId}) {
        try {
            const deletedTag = await TagModel.findByIdAndDelete({_id: tagId})
            return deletedTag
        } catch(err) {
            return new BadRequestError('Cannot delete this tag')
        }
    }

    async findWithPostNumber() {
        try {
            const foundTags = await TagModel.aggregate([
                {
                    $lookup: {
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'tagIds',
                        as: 'posts'
                    }
                }, {
                    $project: {
                        name: 1,
                        postsCount: {$size: '$posts'}
                    }
                }
            ])
            return foundTags
        } catch (err) {
            return new BadRequestError('Cannot find tags')
        }
    }
}

module.exports = TagRepository