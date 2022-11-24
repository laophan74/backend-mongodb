const express = require('express');
const authRoute = require('./authRoute');
const homeRoute = require('./homeRoute');
const shortUrlsRoute = require('./shortUrlsRoute');
const userRoute = require('./userRoute');

const rootRoute = express.Router();

rootRoute.use('/', authRoute);

rootRoute.use('/', homeRoute);

rootRoute.use('/', shortUrlsRoute);

rootRoute.use('/', userRoute);

module.exports = rootRoute;
