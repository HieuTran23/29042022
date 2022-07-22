const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema({
    subName: {
        type: String
    },
    subDescription: {
        type: String
    },
    isSubActive: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('subCategory', SubCategorySchema)