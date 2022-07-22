const PostService = require('../../services/post-service')
const service = new PostService()
const { NEWEST } = require('./constant')

class Base {
    constructor(options){
        this.number = options.number || 10
        this.page = options.page || 1
    }

    async find() {
        try {
            const data = await service.find({number: this.number, page: this.page})
            return data
        } catch (err){
            console.log(err)
        }
    }
}

class Newest extends Base{
    constructor(options){
        super(options)
    }

    async find() {
        try {
            const data = await service.find({number: this.number, page: 1})
            return data
        } catch (err){
            console.log(err)
        }
    }
}

class FindPostFactory {
    async find(options, filter){
        switch (filter){
            case NEWEST: {
                const founded = new Newest(options) 
                return await founded.find()
            }
            default: 
                const founded = new Base(options)
                return await founded.find()
        }
    }
}

module.exports = FindPostFactory