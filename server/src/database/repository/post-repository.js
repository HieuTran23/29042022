const { PostModel } = require('../models')
const { BadRequestError } = require('../../utils/errorApp')

class PostRepository{
    async create(create){
        const { title, metaTitle, userId, content, summary, links, files, image, subCategoryId, tagIds} = create

        try{
            const post = new PostModel({
                title,
                metaTitle,
                userId,
                content,
                summary,
                support: {
                    image,
                    links,
                    files
                },
                subCategoryId,
                tagIds
            })
            const createdPost = await post.save();
            return createdPost;
        } catch(err){
            return new BadRequestError('Cannot create new post')
        }
    }

    async find({number, page}){
        try{
            // const foundPosts = await PostModel.find().skip((number * page) - number).limit(number);
            const foundPosts = await PostModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'subcategories',
                        localField: 'subCategoryId',
                        foreignField: '_id',
                        as: 'subCategory'
                    }
                }, {
                    $unwind: '$subCategory'
                }, {
                    $lookup: {
                        from: 'categories',
                        localField: 'subCategory.categoryId',
                        foreignField: '_id',
                        as: 'category'
                    }
                }, {
                    $unwind: '$category'
                }, {
                    $unwind: '$tagIds'
                }, {
                    $lookup: {
                        from: 'tags',
                        localField: 'tagIds',
                        foreignField: '_id',
                        as: 'tags'
                    }
                }, {
                    $unwind: '$tags'
                },{
                    $group: {
                        _id: '$_id',
                        title: {
                            $first: '$title'
                        },
                        metaTitle: {
                            $first: '$metaTitle'
                        },
                        user: {
                            $first: '$user'
                        },
                        summary: {
                            $first: '$summary'
                        },
                        tags: {
                            $push: '$tags'
                        },
                        subCategory: {
                            $first: '$subCategory'
                        },
                        category: {
                            $first: '$category'
                        },
                        support: {
                            $first: '$support'
                        }
                    }
                }, {
                    $project: {
                        title: 1,
                        metaTitle: 1,
                        'user._id': 1,
                        'user.username': 1,
                        'user.profile': 1,
                        summary: 1,
                        'tags._id': 1,
                        'tags.name': 1,
                        'subCategory._id': 1,
                        'subCategory.subName': 1,
                        'category._id': 1,
                        'category.name': 1,
                        'support.image': 1
                    }
                }, {
                    $sort: {createdAt: -1}
                },{
                    $skip: (number * page) - number
                }, {
                    $limit: number * 1
                }
            ])
            return foundPosts
        } catch (err){
            return new BadRequestError('Cannot find posts')
        }
    }

    async countDocument(){
        try{
            const countPosts = await PostModel.countDocuments()
            return countPosts
        }catch (err){
            return new BadRequestError('Cannot find count posts')
        }
    }

    async findNewestAndLimit({number}){
        try{
            const foundNewestPosts = await PostModel.find().sort({createdAt: -1}).limit(number)
            return foundNewestPosts
        } catch(err) {
            return new BadRequestError('Cannot find newest posts')
        }
    }

    async findOne({postId}){
        try{
            const foundPost = await PostModel.findById(postId)
            return foundPost
        } catch (err){
            return new BadRequestError('Cannot find post')
        }
    }

    async findOneAndDelete({postId}){
        try{
            const deletedPost = await PostModel.findByIdAndDelete(postId)
            return deletedPost;
        } catch(err){
            return new BadRequestError('Cannot find and delete post')    
        }
    }

    async findPostsNumberByArchives() {
        try {
            const foundArchives = await PostModel.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                        postsCount: {$sum: 1}
                    }
                },
                {
                    $sort: {
                        _id: -1
                    }
                }
            ])
            return foundArchives
        } catch (err) {
            console.log(err)
            return new BadRequestError('Cannot find archives')
        }
    }
}

module.exports = PostRepository