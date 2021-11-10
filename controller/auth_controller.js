let userDatabase = require("../models/userDatabase")
const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    let newID = userDatabase.database.length + 1
    const newUser = {
        id: newID,
        email: req.body.email,
        password: req.body.password,
        reminders: []
        }
    userDatabase.database.push(newUser)
    console.log("authcontroller", newUser)
    res.render("auth/login")
    return newUser
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

module.exports = { authController };
