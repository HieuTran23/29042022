const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('comment', CommentSchema)