




let errorManagement = {
    accountError: async (res, err) => {
        const errMessage = err.toString()
        console.log("test", errMessage)
        const errTypes = ["email", "password","name"]
      if (errMessage.search("null") != -1) {
        errTypes.forEach((type) => {
          if (errMessage.search(type) != -1) {
            res.render("auth/register-error", { registerErr: `${type} was empty`, err: errMessage, userExists: false })
          }
        })
      } else {
      errTypes.forEach((type) => {
          if (errMessage.search(type) != -1) {
            res.render("auth/register-error", { registerErr: `user with this ${type} already exists`, err: "Error: user alread exists", userExists: true })
          } else {
          res.render("auth/register-error", { registerErr: `Unknown Error!`, err: errMessage, userExists: false })
          }
        })
      }
      // res.send(err)
      console.log(err)
      return "done"
    }
}

module.exports = { errorManagement };