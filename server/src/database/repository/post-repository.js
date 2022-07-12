const { PostModel } = require('../models')
const { Api404Error, STATUS_CODES } = require('../../utils/errorApp')

class PostRepository{
    async create({ title, metaTitle, userId, content, summary, links, files, image}){
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
                }
            })
            const createdPost = await post.save();
            return createdPost;
        } catch(err){
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot create new post')
        }
    }

    async find({number, page}){
        try{
            const foundPosts = await PostModel.find().skip((number * page) - number).limit(number);
            return foundPosts
        } catch (err){
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find posts')
        }
    }

    async countDocument(){
        try{
            const countPosts = await PostModel.countDocuments()
            return countPosts
        }catch (err){
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find count posts')
        }
    }

    async findNewestAndLimit({number}){
        try{
            const foundNewestPosts = await PostModel.find().sort({createdAt: -1}).limit(number)
            return foundNewestPosts
        } catch(err) {
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find newest posts')
        }
    }

    async findOne({postId}){
        try{
            const foundPost = await PostModel.findById(postId)
            return foundPost
        } catch (err){
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find post')
        }
    }

    async findOneAndDelete({postId}){
        try{
            const deletedPost = await PostModel.findByIdAndDelete(postId)
            return deletedPost;
        } catch(err){
            throw Api404Error('Api Error', STATUS_CODES.INTERNAL_ERROR, 'Cannot find and delete post')    
        }
    }
}

module.exports = PostRepository