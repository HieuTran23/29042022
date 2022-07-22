const { TagController } = require("../controllers")

module.exports = (app) =>{
    //User 
    app.get('/tag', TagController.handleFind)
    app.post('/tag/create', TagController.handleCreate)
    app.get('/tag/find/:id', TagController.handleFindById)
    app.post('/tag/update/:id', TagController.handleUpdateById)
    app.get('/tag/delete/:id', TagController.handleDeleteById)
    app.get('/tag/find_all_post_number', TagController.handleFindWithPostNumber)
}