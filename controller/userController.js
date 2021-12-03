const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = async (email, password) => {
  let user = await userModel.findOne(email);
  console.log("getuserbyemailandpassword has been called!!!")
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  console.log("returning nul from getuserbyemaiidandpas")
  return null;
};

const getUserByGithubIdOrCreate = async (profile) => {
  console.log("github user controller called!")
  let user = await userModel.findOrCreate(profile)
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
