const { SubCategoryController } = require("../controllers")

module.exports = (app) => {
    //Admin 
    app.post('/admin/category/:id/create', SubCategoryController.handleCreate)
    app.get('/admin/category/:id/find_all', SubCategoryController.handleFindByCategoryId)
    app.post('/admin/category/:id/update/:subId', SubCategoryController.handleUpdateById)
    app.get('/admin/category/:id/delete/:subId', SubCategoryController.handleDeleteById)
}