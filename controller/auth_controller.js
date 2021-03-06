const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { userModel } = require("../models/userModel");
const { errorManagement } = require("../controller/errorManagement")

let authController = {
  login: async (req, res) => {
    res.render("auth/login");
  },

  register: async (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: async (req, res) => {
    console.log("Request sent")//Get this line of code to work somehow
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/login",
    })
  },

  registerSubmit: async (req, res) => {
    try {
      await userModel.createUser(req.body)
      res.redirect("/auth/login")
    } catch (err) {
      errorManagement.accountError(res, err)
    }
  },


  logout: async (req, res) => {
    // res.session.destroy();
    res.logout()
    res.redirect("/auth/login");
  },

  githubLogin: (req, res, next) => {
    passport.authenticate('github', {scope: ['user:email']})(req, res, next)
  },
  gitback: (req, res, next) => {
    passport.authenticate('github', {failureRedirect: '/auth/login', successRedirect: "/reminders"})(req, res, next)
  },
  // unsplashImage: (req,res,next) => {
  //   const randomPicture = require()
  // }
};

module.exports = authController;
