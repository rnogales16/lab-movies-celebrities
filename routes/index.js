const router = require("express").Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


const express = require("express");
const indexRouter = express.Router();

// GET  /
indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Express basic auth" });
});

module.exports = indexRouter;