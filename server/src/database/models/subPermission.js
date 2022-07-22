const mongoose = require("mongoose");

const SubPermissionSchema = mongoose.Schema({
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
    permissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permission'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('subPermission', SubPermissionSchema)