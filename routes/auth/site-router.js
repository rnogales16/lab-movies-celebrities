//in app js create a route with everything protected(dont see anything from user).
//build siteRouter (only move if the user is logged in) 
const express = require('express');
const serveFavicon = require('serve-favicon');
const siteRouter = express.Router()
const isLoggedIn = require('../../middleware/isLoggedIn')


siteRouter.get('/user-home', isLoggedIn, (req, res) => {
  res.render('home-users')
})

module.exports = siteRouter;