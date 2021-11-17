const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  console.log("getuserbyemailandpassword has been called!!!")
  if (user) {
    if (isUserValid(user, password)) {
      console.log("valid login by email!!!")
      return user;
    }
  }
  return null;
};

const getUserByGithubIdOrCreate = (profile) => {
  console.log("github user controller called!")
  let user = userModel.findOrCreate(profile)
  console.log(user)  
  return user
}

const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGithubIdOrCreate
};
