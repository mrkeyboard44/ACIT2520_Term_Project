const fetch = require("node-fetch");
require('dotenv').config()
const process = require('process');
const { errorManagement } = require("../controller/errorManagement")
const { PrismaClient } = require(".prisma/client");
const { randomUUID } = require("crypto");
const { Error } = require("mongoose");
const prisma = new PrismaClient()

const getRandomImage = async () => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}`)
    const jsonData =  await response.json()
    return jsonData.urls.regular
  } catch (err) {
    console.log(err)
  }
}

const userModel = {
  findOne: async (email) => {
    const db_users = await prisma.user.findMany()

    const user = db_users.find((db_user) => db_user.email === email);
    console.log("using userModel to look for user by email!!!")
    if (user) {
      return user;
    }
  },
  findById: async (id) => {
    const db_users = await prisma.user.findMany()
    const user = db_users.find((db_user) => db_user.id === id);
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
  updateEmail: async (profile) => {
    try {
      const { id, email } = profile
      await prisma.user.update({
          where: { id },
          data: { email }
        });
    } catch (err) {
      throw err
    }
  },
  updatePassword: async (profile) => {
    try {
      const { id, password } = profile
      await prisma.user.update({
          where: { id },
          data: { password }
        });
    } catch (err) {
      throw err
    }
  },
  updateUser: async (change, req) => {
    const id = req.user.id
    console.log("updateuser id", id)
    const { name, email, password } = req.body
    console.log("updateuser profile", req.body)
    const types = ['email', 'password', 'name']
    
    let userChangeError = 'no error'
    try {
      if (change == 'email')
        {
          await prisma.user.update({
            where: { id },
            data: { email }
          })
          console.log("prisma updated")
        }
        if (change == 'password') {
          await prisma.user.update({
            where: { id },
            data: { password }
          })
        }
        if (change == 'name') {
          console.log("prisma updating")
          await prisma.user.update({
            where: { id },
            data: { name }
          })
          console.log("prisma updated")
        }
       
      } catch (err) {
        console.log("as usermode i have caught an errors", err)
        // const errMessage = await err.toString()
        throw new Error(err)
      }
    
  }
};



module.exports = { userModel };
