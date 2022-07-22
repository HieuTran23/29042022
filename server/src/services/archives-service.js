const { PostRepository } = require("../database");
const { FormatData } = require("../utils");
const { Api404Error } = require("../utils/errorApp");

class PostService{
    constructor() {
        this.postRepository = new PostRepository();
    }

    async findPostsNumberByArchives() {
        try {
            const foundArchives = await this.postRepository.findPostsNumberByArchives()
            return FormatData({foundArchives})
        } catch (err) {
            throw new Api404Error(err)
        }
    }
}

module.exports = PostService