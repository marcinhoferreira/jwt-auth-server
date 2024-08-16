const express = require('express');
const controller = require('../controllers');

const publicRoutes = express();

publicRoutes.get('/status', controller.status);
publicRoutes.post('/auth/signIn', controller.auth.signIn);
publicRoutes.post('/auth/signUp', controller.auth.signUp);

module.exports = publicRoutes;