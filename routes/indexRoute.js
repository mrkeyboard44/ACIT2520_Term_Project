const express = require("express");
const adminController = require("../controller/adminController");
const remindersController = require("../controller/reminder_controller");
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const profileController = require("../controller/profileController");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/reminders", ensureAuthenticated, remindersController.list);

router.get("/reminder/new", ensureAuthenticated, remindersController.new);

router.get("/reminder/:id", ensureAuthenticated, remindersController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, remindersController.edit);

router.get("/reminder/", ensureAuthenticated, remindersController.create);

router.post("/reminder/update/:id", ensureAuthenticated, remindersController.update);

router.post("/reminder/delete/:id", ensureAuthenticated, remindersController.delete);

router.post("/reminder/", ensureAuthenticated, remindersController.create);

router.post("/uploads", ensureAuthenticated, remindersController.upload);

router.get("/admin", ensureAuthenticated, isAdmin, adminController.dashboard);

router.get("/admin/:id", ensureAuthenticated, isAdmin, adminController.revoke_session);

router.get("/profile-settings", ensureAuthenticated, profileController.profile);

router.post("/profile-settings", ensureAuthenticated, profileController.updateUser)

module.exports = router;
