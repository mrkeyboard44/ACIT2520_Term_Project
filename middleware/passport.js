const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GithubStrategy = require('passport-github2').Strategy;
const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await userController.getUserByEmailIdAndPassword(email, password);
    console.log("user auth accepted from getuserbyemail")
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  console.log("serialize", user)
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  let user = await userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

console.log("passport.js has been called!!!")


let githubLogin = new GithubStrategy(
  {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3001/auth/github/callback"
},
async (accessToken, refreshToken, profile, done) => {
  console.log("github strategy passport profile", profile)
  let user = await userController.getUserByGithubIdOrCreate(profile)
  console.log("github strategy passport user",user)
  return done(null, user);
  
  }
);

module.exports = passport.use(localLogin).use(githubLogin);
