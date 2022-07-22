const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    role:{
        type: Number,
        default: 0,
        require: true
    },
    subPermissionIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subPermission'
    }],
    profile:{
        fullName: {
            firstName: String,
            lastName: String
        },
        description: String,
        contact: {
            address: {
                street: String,
                city: String,
                country: String
            },
            phone: String,
            email: String
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', UserSchema)