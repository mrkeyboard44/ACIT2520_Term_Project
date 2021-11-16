const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { database } = require("../models/userDatabase");
const authController = require("../controller/auth_controller");

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
  (req, res) => {
    console.log("authrouet", req.body.email)
    let newUser = {
      id: database.length + 1,
      name: "NULL",
      email: req.body.email,
      password: req.body.password,
      reminders: [],
    }
    database.push(newUser)
    console.log(database)
    console.log('i should display the database')
    res.redirect("/auth/login")
  }
)

router.get("/github", authController.githubLogin)
router.get("/github/callback", authController.gitback)


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});



module.exports = router;
