const express = require('express');
const controller = require('../controllers');

const privateRoutes = express();

privateRoutes.get('/auth/profile/:userId', controller.auth.profile);

module.exports = privateRoutes;