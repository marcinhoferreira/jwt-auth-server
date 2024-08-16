const express = require('express');
const controller = require('../controllers');

const publicRoutes = express();

publicRoutes.get('/status', controller.status);

module.exports = publicRoutes;