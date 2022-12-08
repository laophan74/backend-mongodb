const express = require('express');
const { createUrlsController, deleteUrlsController } = require('../controller/shortUrlsController');

const shortUrlsRoute = express.Router();

shortUrlsRoute.route('/shortUrls').post(createUrlsController);

shortUrlsRoute.route('/deleteUrls').post(deleteUrlsController);

module.exports = shortUrlsRoute;
