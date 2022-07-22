const { RoleController } = require("../controllers")

module.exports = (app) => {
    //Admin
    app.get('/admin/role', RoleController.handleFind)
    app.post('/admin/role/create', RoleController.handleCreate)
    app.get('/admin/role/find/:id', RoleController.handleFindById)
    app.post('/admin/role/update/:id', RoleController.handleUpdateById)
    app.get('/admin/role/delete/:id', RoleController.handleDeleteById)
}