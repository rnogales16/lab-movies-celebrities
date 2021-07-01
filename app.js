// ℹ️ Gets access to environment variables/settings
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');


const app = express();




app.use(
  session({
    secret: 'PizzaBytes',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/auth-demo'
    })
  })
);
// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const homeRouter = require("./routes/auth/home-router");
app.use("/home-users", homeRouter);

const authRouter = require("./routes/auth/auth-router");
app.use("/auth", authRouter);

const siteRouter = require("./routes/auth/site-router");
app.use('/site', siteRouter)


const celebritiesRoute = require('./routes/celebrities.routes')
app.use('/celebrities', celebritiesRoute)

const moviesRoute = require('./routes/movies.routes')
app.use('/movies', moviesRoute)

const index = require('./routes/index');
app.use('/', index);


const isLoggedIn = require('./middleware/isLoggedIn');

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);


module.exports = app;
