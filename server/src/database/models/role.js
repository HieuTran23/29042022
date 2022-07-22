const mongoose = require("mongoose");

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: false
    },
    subPermissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subPermission'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('role', RoleSchema)