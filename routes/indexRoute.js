const express = require("express");
const remindersController = require("../controller/reminder_controller");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
let database = require("../database");

router.get("/", (req, res) => {
  res.send("welcome");
});

// router.get("/reminders", ensureAuthenticated, (req, res) => {
//   console.log(req.user.name)
//   let user = req.user.name
//   res.render("reminder/index", { reminders: database.cindy.reminders })
// });

router.get("/reminders", ensureAuthenticated, remindersController.list);

router.get("/reminder/new", ensureAuthenticated, remindersController.new);

router.get("/reminder/:id", ensureAuthenticated, remindersController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, remindersController.edit);

router.get("/reminder/", ensureAuthenticated, remindersController.create);

module.exports = router;


// app.get("/reminders", reminderController.list);

// app.get("/reminder/new", reminderController.new);

// app.get("/reminder/:id", reminderController.listOne);

// app.get("/reminder/:id/edit", reminderController.edit);

// app.post("/reminder/", reminderController.create);

// // Implement this yourself
// app.post("/reminder/update/:id", reminderController.update);

// // Implement this yourself
// app.post("/reminder/delete/:id", reminderController.delete);