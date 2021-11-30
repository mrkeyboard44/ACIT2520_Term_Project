const { PrismaClient } = require(".prisma/client");
const prisma = new PrismaClient()

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

  isAdmin: async (req, res, next) => {
    const id = req.user.id
    const db_users = await prisma.user.findMany()
    const user = db_users.find((db_user) => db_user.id === id);
    console.log("isadmin user", user)
    if (user.role == 'admin') {
      console.log("your an admin :D")
      return next()
    } else {
    console.log("not an admin, nice try bucko.")
    res.redirect("/reminders")
    }
  }
};
