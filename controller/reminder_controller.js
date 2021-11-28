const { userModel } = require("../models/userModel");
const imgur = require("imgur")
const fs = require("fs")
const { PrismaClient } = require(".prisma/client");
const prisma = new PrismaClient()

let remindersController = {
  list: async (req, res) => {
    console.log(req.user)
    console.log("req id", await prisma.reminder.findMany())
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
    console.log(getReminders)
    res.render("reminder/index", { user: req.user, reminders: getReminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
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

    console.log("getremider", getReminder)

    if (getReminder != undefined) {
      res.render("reminder/single-reminder", { reminderItem: getReminder[0] });
    } else {
      res.render("reminder/index", { reminders: userModel.findById(req.user.id).reminders });
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

    
    res.render("reminder/edit", { reminderItem: getReminder[0] });
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

    console.log(reminder)
    res.redirect("/reminders");

  },

  delete: (req, res) => {
    let index = -1;
    if (index <= 0) {
      userModel.findById(req.user.id).reminders.splice(index, 1);
    }
    res.redirect("/reminders");
  },

  upload: async (req, res) => {
      console.log("i am a file")
      const file = req.files[0];
      console.log("file:", file)
      try {
        console.log("uploading file to imgur")
        const url = await imgur.uploadFile(`./uploads/${file.filename}`);
        console.log("file uploaded")
        // res.json({ message: url.data.link });
        req.user.image = url.link
        console.log(url)
        await fs.unlinkSync(`./uploads/${file.filename}`);
        res.redirect('/reminders')
      } catch (error) {
        console.log("error", error);
      }
  }
};

module.exports = remindersController;
