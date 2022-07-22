const { SubPermissionController } = require("../controllers")

module.exports = (app) => {
    //Admin
    app.get('/admin/permission/:id/find_all', SubPermissionController.handleFindByPermissionId)
    app.post('/admin/permission/:id/create', SubPermissionController.handleCreate)
    app.post('/admin/permission/:id/update/:subId', SubPermissionController.handleUpdateById)
    app.get('/admin/permission/:id/delete/:subId', SubPermissionController.handleDeleteById)
}