const { PermissionController } = require("../controllers")

module.exports = (app) => {
    //Admin
    //--Permission
    app.get('/admin/permission', PermissionController.handleFind)
    app.post('/admin/permission/create', PermissionController.handleCreate)
    app.get('/admin/permission/find/:id', PermissionController.handleFindById)
    app.post('/admin/permission/update/:id', PermissionController.handleUpdateById)
    app.get('/admin/permission/delete/:id', PermissionController.handleDeleteById)

    //--Sub permission
    // app.post('/admin/permission/:id/create', PermissionController.handleCreateSubPermission)
    // app.post('/admin/permission/:id/update/:subId', PermissionController.handleUpdateSubPermission)
    // app.get('/admin/permission/:id/delete/:subId', PermissionController.handleDeleteSubPermission)
}