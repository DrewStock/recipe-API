const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');
const cors = require('cors')();
require('dotenv').config();

//require in routers
const recipes = require('./routes/recipes');

app.use(morgan('dev'));

app.use(cors);
app.use(express.static('./public'));

//add api routes here
app.use('/api/recipes', recipes);

app.use(errorHandler);

module.exports = app;
