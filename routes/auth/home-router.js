const express = require("express");
const homeRouter = express.Router();

// GET  /
homeRouter.get("/", (req, res) => {
  res.render("auth-views/home-users", { title: "Express basic auth" });
});

module.exports = homeRouter;

