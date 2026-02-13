const express = require('express');
const { addAdminPage, addAdmin, viewAllAdmin, deleteAdmin, updateAdmin, editAdmin } = require('../controller/admin.controller');
const uploadImg = require('../middleware/uploadImg');
const routes = express.Router();


routes.get('/add-admin', addAdminPage);
routes.post('/add-admin', uploadImg.single('profileImg'), addAdmin);
routes.get('/view-admin', viewAllAdmin);
routes.get('/edit-admin', editAdmin);
routes.get('/update-admin', updateAdmin);
routes.get('/delete-admin/:id', deleteAdmin)

module.exports = routes;