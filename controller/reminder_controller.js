let database = require("../database");

let remindersController = {
  list: (req, res) => {
    console.log(req.user.id)
    console.log(database[req.user.id])
    res.render("reminder/index", { reminders: database[req.user.id].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
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
    database.cindy.reminders.map( (rem, i) => {
      if (reminder.id == rem.id) {
         database.cindy.reminders.splice(i, 1, reminder)
        } 
      });
    console.log(reminder)
    res.redirect("/reminders");

  },

  delete: (req, res) => {
    // Implement this code
    let reminderToFind = req.params.id;
    let index = -1;
    if (index <= 0) {
      database.cindy.reminders.splice(index, 1);
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
