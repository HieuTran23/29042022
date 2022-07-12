const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        max: 100
    },
    metaTitle: {
        type: String,
        max: 100
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String
    },
    summary: {
        type: String
    },
    support: {
        image: {
            path: {
                type: String
            }
        },
        links: [{
            path: {
                type: String
            }
        }],
        files: [{
            path: {
                type: String,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }]
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},
{ timestamps: true })

module.exports = mongoose.model('post', PostSchema)