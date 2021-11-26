const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { database } = require("../models/userDatabase");
const { userModel } = require("../models/userModel");

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
      res.send(err)
    }
  },


  logout: async (req, res) => {
    // res.session.destroy();
    res.logout()
    res.redirect("/auth/login");
  },

  githubLogin: (req, res) => {
    passport.authenticate('github', {scope: ['user:email']})(req, res, next)
  },
  gitback: (req, res) => {
    passport.authenticate('github', {failureRedirect: '/auth/login', successRedirect: "/reminders"})(req, res, next)
  },
  // unsplashImage: (req,res,next) => {
  //   const randomPicture = require()
  // }
};

module.exports = authController;
