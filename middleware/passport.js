const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GithubStrategy = require('passport-github2').Strategy;
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    console.log("email and password", email, password)
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

console.log("passport.js has been called!!!")


const githubLogin = (new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https//localhost:3001/auth/github/callback"
},
(accessToken, refreshToken, profile, done) => {
  console.log(profile)
  let user = userController.getUserByGithubIdOrCreate(profile)
  return done(null, user);
  }
));





module.exports = passport.use(localLogin).use(githubLogin);
