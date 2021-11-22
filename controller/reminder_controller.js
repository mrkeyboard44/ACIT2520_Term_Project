const { userModel } = require("../models/userModel");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: userModel.findById(req.user.id).reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userModel.findById(req.user.id).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userModel.findById(req.user.id).reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: userModel.findById(req.user.id).reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    userModel.findById(req.user.id).reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userModel.findById(req.user.id).reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description
    };
    if (req.body.completed == 'true') {
      reminder['completed'] = true
    } else {
      reminder['completed'] = false
    }
    userModel.findById(req.user.id).reminders.map( (rem, i) => {
      if (reminder.id == rem.id) {
        userModel.findById(req.user.id).reminders.splice(i, 1, reminder)
        } 
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

  



};

module.exports = remindersController;
