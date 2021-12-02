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
      console.log("profile from 'createUser'")
      const { id, name, email, password, role } = profile;
      for ([key, val] of Object.entries(profile)) {
        console.log("keyss=-----------------", key, val)
        if (val === "") {
          throw new Error(`Error: no ${key} was provided (null values given)`)
        }
      }
      //keep this text here to return a proper error message
      // same here
      //this as well just to be sure

      await prisma.user.create({
          data: { "githubId": "githubtest", name, email, password, "image": new_picture, "role":"user" }
      });
    } catch (err) {
      console.log("couldnt create user:")
      throw err
    }
  },
  findOrCreate: async (profile) => {
    let db_users = await prisma.user.findMany()
    try {
      const user = db_users.find((db_user) => db_user.githubId === profile.nodeId);
      if (user != undefined) {
        return user
      } else {
        new_picture = await getRandomImage()
        console.log(new_picture)
        const { nodeId, username } = profile;
        await prisma.user.create({
            data: { "githubId": nodeId, 'name': username, "email":"unknown", "password":"unknown", "image": new_picture, "role":"user" }
          });
        let db_users = await prisma.user.findMany()
        const user = await db_users.find((db_user) => db_user.githubId === profile.nodeId);
        return user
      }
    } catch (err) {
      throw err
    }
  },
  
};



module.exports = { userModel };
