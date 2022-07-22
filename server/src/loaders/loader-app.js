const express = require('express');
const cors  = require('cors');
const HandleErrors = require('../middleware/errorHandler')
const { user, post, category, tag, role, permission, subPermission, subCategory, archives } = require('../routes')

module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public')) 
    
    //Route
    user(app)
    post(app)
    category(app)
    tag(app)
    role(app)
    permission(app)
    subPermission(app)
    subCategory(app)
    archives(app)

    //Error handling
    app.use(HandleErrors)
}