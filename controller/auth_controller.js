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

  githubLogin: (req, res, next) => {
    passport.authenticate('github', { scope: [ "user:email" ] })(req, res, next)
  },
  gitback: (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/auth/login', successRedirect: "/reminder/dashboard"})(req, res, next)
  },

};

module.exports = authController;
