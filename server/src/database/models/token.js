const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token:{
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('token', TokenSchema)