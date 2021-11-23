const express = require("express")
const { forwardAuthenticated } = require("../middleware/checkAuth");
const authController = require("../controller/auth_controller");
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
