const express = require("express")
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
require('dotenv').config()
const fetch = require("node-fetch");

const router = express.Router();
const getRandomImage = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}`)
    const jsonData =  await response.json()
    console.log(jsonData)
    return jsonData.urls.regular
  } catch (err) {
    console.log(err)
  }
}
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
router.get("/register", (req, res) => res.render("auth/register"))

router.post(
  "/register",
  async (req, res) => {
    console.log("authrouet", req.body.email)
    let newUser = {
      id: database.length + 1,
      name: "NULL",
      email: req.body.email,
      password: req.body.password,
      reminders: [],
      role: 'user',
      image: await getRandomImage(),
    }

    database.push(newUser)
    console.log(database)
    console.log('i should display the database')
    res.redirect("/auth/login")
  }
)

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
const passport = require("passport")

const router = express.Router();

router.get("/login", forwardAuthenticated, authController.login);

router.post("/login", (req, res) => { passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login",
})
});

router.get("/register", authController.register)

router.post("/register", authController.registerSubmit)

router.get("/logout", authController.logout);

router.get("/github", authController.githubLogin)
router.get("/github/callback", authController.gitback)

module.exports = router;
