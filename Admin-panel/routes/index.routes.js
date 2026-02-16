const express = require('express');
const { dashboardPage, logIn, logInPage, logout, changePasswordPage, changePassword, myProfile } = require('../controller/index.controller');
const routes = express.Router();

routes.get('/', logInPage);
routes.post('/login', logIn);
routes.get('/dashboard', dashboardPage);
routes.get('/change-password', changePasswordPage)
routes.post('/change-password', changePassword)
routes.get('/my-profile', myProfile);
routes.get('/logout', logout);

routes.use('/admin', require('./admin.routes'));

module.exports = routes;