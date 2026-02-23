const express = require('express');
const { dashboardPage } = require('../controller/index.controller');
const routes = express.Router();

routes.get('/', dashboardPage);

routes.use('/blog', require('./blog.routes'));

module.exports = routes;