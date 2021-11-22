module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      console.log("not authenticated :(")
      return next();
    }
    res.redirect("/reminders");
  },

  isAdmin: function(req, res, next) {
    if (req.user.role == 'admin') {
      console.log("your an admin :D")
      return next()
    } else {
    console.log("not an admin, nice try bucko.")
    res.redirect("/reminders")
    }
  }
};
