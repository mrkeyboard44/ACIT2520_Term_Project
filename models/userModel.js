const { PrismaClient } = require(".prisma/client");
const { randomUUID } = require("crypto");
const { database } = require("./userDatabase");
const prisma = new PrismaClient()
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

  createUser: async(profile) => {
    try {
      console.log(profile)
      const { id, name, email, password, role } = profile;
      const user = await prisma.user.create({
          data: { "githubId": id , name, email, password,  "role":"user" }
      });
    } catch (err) {
      throw err
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
      }
      database.push(newUser)
      const user = database.find((user) => user.id == profile.id);
      return user
    }
  },
  
};



module.exports = { userModel };
