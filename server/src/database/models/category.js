const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String
    },
    subCategories: [{
        subName: {
            type: String,
        },
        subDescription: {
            type: String
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('category', CategorySchema)