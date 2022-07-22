const mongoose = require('mongoose')

const TagSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('tag', TagSchema)