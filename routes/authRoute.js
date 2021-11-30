const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
require('dotenv').config()
const fetch = require("node-fetch");

const router = express.Router();
router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);
router.get("/image", (req,res) => res.render("auth/image"))
router.post("/image", (req,res) => res.redirect("/auth/login"))


router.get("/register", authController.register)
router.post("/register", authController.registerSubmit)


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.get("/github", authController.githubLogin)
router.get("/github/callback", authController.gitback)

module.exports = router;
