const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');
// const ensureAuth = require('./auth/ensureAuth')();
const cors = require('cors')();
require('dotenv').config();

//require in routers
// const auth = require('./routes/auth');
// const users = require('./routes/users');
const recipes = require('./routes/recipes');

app.use(morgan('dev'));

app.use(cors);
app.use(express.static('./public'));

//add api routes here
// app.use('/api/auth', auth);
// app.use('/api/users', ensureAuth, users);
app.use('/api/recipes', recipes);

app.use(errorHandler);

module.exports = app;
