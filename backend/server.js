/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const rootRoute = require('./routes');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(cookieParser());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/', rootRoute);

app.listen(8000);
