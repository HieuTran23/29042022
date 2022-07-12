const { PostRepository, UserRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error, BadRequestError } = require("../utils/errorApp");

class PostService{
    constructor() {
        this.postRepository = new PostRepository();
        this.userRepository = new UserRepository();
    }

    async create(data) {
        const {title, metaTitle, content, summary, links, files, image, username} = data

        try {
            const user = await this.userRepository.findOneAndRemovePassword({username})
            const createdPost = await this.postRepository.create({title, metaTitle, userId: user._id, content, summary, links, files, image})
            return FormatData({createdPost})
        } catch (err){
            throw new Api404Error('Data Not Found', err)
        }
    }

    async find({number, page}) {
        try{
            const countPosts = await this.postRepository.countDocument()
            const foundPosts = await this.postRepository.find({number, page})
            return FormatData({foundPosts, pages: Math.ceil(countPosts / number)})
        } catch (err){
            throw new Api404Error('Data Not Found', err)
        }
    }

    async findNewest({number}){
        try{
            const foundNewestPosts = await this.postRepository.findNewestAndLimit({number})
            return FormatData({foundNewestPosts})
        } catch(err){
            throw new Api404Error('Data Not Found', err)
        }
    }

    async findOne(data) {
        const {postId} = data

        try{
            const foundPost = await this.postRepository.findOne({postId})
            return FormatData({ posts: foundPost })
        } catch (err) {
            throw new Api404Error('Data Not Found', err)
        }
    }

    async findOneAndDelete(data) {
        const {postId, username} = data
        
        //Check author
        try{
            const foundUser = await this.userRepository.findOneAndRemovePassword({username: username})
            const foundPost = await this.postRepository.findOne({postId})
            if(foundUser._id !== foundPost.userId) throw new Error()
        } catch (err) {
            throw new BadRequestError('Cannot delete')
        }

        //Delete
        try{
            const deletedPost = await this.postRepository.findOneAndDelete({postId})
            return FormatData({ deletedPost})
        } catch(err){
            throw new Api404Error('Data Not Found', err)
        }
    }
}

module.exports = PostService