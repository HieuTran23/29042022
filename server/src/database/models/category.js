const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String
    },
    // subCategories: [{
    //     subName: {
    //         type: String,
    //     },
    //     subDescription: {
    //         type: String
    //     },
    //     isSubActive: {
    //         type: Boolean,
    //         default: true
    //     },
    //     createdAt:{
    //         type: Date,
    //         default: Date.now
    //     }
    // }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('category', CategorySchema)