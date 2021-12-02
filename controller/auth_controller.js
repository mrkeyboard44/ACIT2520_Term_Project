const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { userModel } = require("../models/userModel");

let authController = {
  login: async (req, res) => {
    console.log("params------------------------------",req)
    res.render("auth/login");
  },

  register: async (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: async (req, res) => {
    console.log(req)
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
      const errTypes = ["email", "password","name"]
      let errMessage = err.toString()
      if (errMessage.search("null") != -1) {
        errTypes.forEach((type) => {
          if (errMessage.search(type) != -1) {
            res.render("auth/register-error", { registerErr: `${type} was empty`, err })
          }
        })
      } else {
      errTypes.forEach((type) => {
          if (errMessage.search(type) != -1) {
            res.render("auth/register-error", { registerErr: `user with this ${type} already exists`, err })
          } else {
          res.render("auth/register-error", { registerErr: `Unknown Error!`, err })
          }
        })
      }
      // res.send(err)
      console.log(err)
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
