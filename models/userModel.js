const fetch = require("node-fetch");
const { database } = require("./userDatabase");
require('dotenv').config()
const process = require('process');

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    console.log("using userModel to look for user by email!!!")
    if (user) {
      return user;
    }
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
  },
  findOrCreate: (profile) => {
    console.log(profile.id)
    const user = database.find((user) => user.id == profile.id);
    if (user) {
      return user;
    } else {
      let newUser = {
        id: profile.id,
        name: profile.username,
        email: null,
        password: null,
        reminders: [],
        image: profile._json.avatar_url,
      };
      database.push(newUser)
      const user = database.find((user) => user.id == profile.id);
      return user
    }
  },
  
};

module.exports = { userModel };
