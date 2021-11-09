let database = require("../database");
const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log("Request sent")
    console.log (passport.authenticate) //Get this line of code to work somehow
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/login",
    })
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
