const { default: mongoose } = require("mongoose");

const PermissionSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String
    },
    // subPermissions: [{
    //     subName: {
    //         type: String
    //     },
    //     subDescription: {
    //         type: String
    //     },
    //     isSubActive: {
    //         type: Boolean,
    //         default: false
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now
    //     }
    // }],
    isActive: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('permission', PermissionSchema)