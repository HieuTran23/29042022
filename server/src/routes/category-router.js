const { CategoryController } = require('../controllers')
const { AuthenticateToken } = require('../middleware/auth')

module.exports = (app) => {
    //Admin
    //--Category
    app.get('/admin/category', CategoryController.handleFind)
    app.post('/admin/category/create', CategoryController.handleCreate)
    app.get('/admin/category/find/:id', CategoryController.handleFindById)
    app.post('/admin/category/update/:id', CategoryController.handleUpdateById)
    app.get('/admin/category/delete/:id', CategoryController.handleDeleteById)
    
    //--Sub-Category
    app.post('/admin/category/:id/create', CategoryController.handleCreateSubCategory)
    app.post('/admin/category/:id/update/:subId', CategoryController.handleUpdateSubCategory)
    app.get('/admin/category/:id/delete/:subId', CategoryController.handleDeleteSubCategory)
}