const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { database } = require("../models/userModel");
const { authController } = require("../controller/auth_controller")

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.get("/register", (req, res) => res.render("auth/register"))

router.post(
  "/register",
  
  (req, res) => database.push(authController.register(req, res))
)

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
