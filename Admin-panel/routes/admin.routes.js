const express = require('express');
const { addAdminPage, addAdmin, viewAllAdmin } = require('../controller/admin.controller');
const uploadImg = require('../middleware/uploadImg');
const routes = express.Router();


routes.get('/add-admin', addAdminPage);
routes.post('/add-admin', uploadImg.single('profileImg'), addAdmin);
routes.get('/view-admin', viewAllAdmin);

module.exports = routes;