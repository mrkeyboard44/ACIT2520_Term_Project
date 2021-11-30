const fetch = require("node-fetch");
require('dotenv').config()
const process = require('process');

const { PrismaClient } = require(".prisma/client");
const { randomUUID } = require("crypto");
const prisma = new PrismaClient()

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


const userModel = {
  findOne: async (email) => {
    const db_users = await prisma.user.findMany()

    const user = db_users.find((db_user) => db_user.email === email);
    console.log("user from usermodel findone", user, user.id)
    console.log("using userModel to look for user by email!!!")
    if (user) {
      return user;
    }
  },
  findById: async (id) => {
    const db_users = await prisma.user.findMany()

    const user = db_users.find((db_user) => db_user.id === id);
    console.log("findById", user.id, id)
    if (user) {
      return user;
    }
  },

  createUser: async(profile) => {
    try {
      new_picture = await getRandomImage()
      console.log(new_picture)
      console.log("profile from 'createUser'")
      const { id, name, email, password, role } = profile;
      await prisma.user.create({
          data: { "githubId": "githubtest", name, email, password, "image": new_picture, "role":"user" }
      });
    } catch (err) {
      console.log("couldnt create user:")
      throw err
    }
  },
  findOrCreate: async (profile) => {

    console.log(profile.nodeId)
    const db_users = await prisma.user.findMany()
    try {
      const user = await db_users.find((db_user) => db_user.githubId === profile.nodeId);
      console.log(user.githubId, profile.nodeId)
      if (user != undefined) {
        return user
      } else {
        console.log("find or create users")
        new_picture = await getRandomImage()
        console.log(new_picture)
        console.log("profile from 'createUser'")
        const { nodeId, username } = profile;
        const newUser = await prisma.user.create({
            data: { "githubId": nodeId, 'name': username, "email":"unknown", "password":"unknown", "image": new_picture, "role":"user" }
          });

        const db_users = await prisma.user.findMany()
        const user = await db_users.find((db_user) => db_user.githubId === profile.nodeId);
        return user
      }
    } catch (err) {
      console.log("couldnt create user:", profile)
      throw err
    }
  },
  
};



module.exports = { userModel };
