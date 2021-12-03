const { userModel } = require("../models/userModel");
const imgur = require("imgur")
const fs = require("fs")
const { PrismaClient } = require(".prisma/client");
const prisma = new PrismaClient()

let remindersController = {
  list: async (req, res) => {
    const getReminders = await prisma.reminder.findMany({
      where: {
        userId: {
          contains: req.user.id,
        },
      },
      include: {
        user: true, // Return all fields
      },
    })
    res.render("reminder/index", { user: req.user, reminders: getReminders });
  },

  new: (req, res) => {
    res.render("reminder/create", { user: req.user });
  },

  listOne: async (req, res) => {

    let reminderToFind = req.params.id;
    const getReminder = await prisma.reminder.findMany({
      where: {
        userId: {
          contains: req.user.id,
        },
        id: {
          contains: reminderToFind,
        },
      },
      include: {
        user: true, // Return all fields
      },
    })

    if (getReminder != undefined) {
      res.render("reminder/single-reminder", { user: req.user, reminderItem: getReminder[0] });
    } else {
      res.render("reminder/index", { user: req.user, reminders: userModel.findById(req.user.id).reminders });
    }
  },

  create: async (req, res) => {

    const { title, description } = req.body;
    const { id } = req.user
      const reminder = await prisma.reminder.create({
          data: { title: title, description: description, completed: false, userId: id }
      });
    res.redirect("/reminders");
  },

  edit: async (req, res) => {
    let reminderToFind = req.params.id;
    const getReminder = await prisma.reminder.findMany({
      where: {
        userId: {
          contains: req.user.id,
        },
        id: {
          contains: reminderToFind,
        },
      },
      include: {
        user: true,
      },
    })

    
    res.render("reminder/edit", { user: req.user, reminderItem: getReminder[0] });
  },

  update: async (req, res) => {

    let reminderToFind = req.params.id
    const { id, title, description, completed } = req.body
    if (completed == 'true') {
      new_completed = true
    } else {
      new_completed = false
    }
    const reminder = await prisma.reminder.update({
        where: { id: reminderToFind },
        data: { title: title, description: description, completed: new_completed }
    });
    res.redirect("/reminders");

  },

  delete: async (req, res) => {
    let reminderToFind = req.params.id
    const { id, title, description, completed } = req.body
    const deleteReminder = await prisma.reminder.delete({
      where: {
        id: reminderToFind,
      },
    })
    res.redirect("/reminders");
  },

  upload: async (req, res) => {
      console.log("i am a file")
      const fileupload = req.files[0];
      try {
        console.log("uploading file to imgur")
        let url = await imgur.uploadFile(`./uploads/${fileupload.filename}`);
        console.log("file uploaded")
        // res.json({ message: url.data.link });
        await prisma.user.update({
          where: { id: req.user.id },
          data: { "image": url.link }
        });
        // req.user.image = url.link
        await fs.unlinkSync(`./uploads/${fileupload.filename}`);
        
        res.redirect('/profile-settings')
      } catch (error) {
        console.log("error", error);
      }
  },
  
};

module.exports = remindersController;
