const { userModel } = require("../models/userModel");
const { errorManagement } = require("../controller/errorManagement")
const { PrismaClient } = require(".prisma/client");
const { type } = require("os");
const prisma = new PrismaClient()

const profileController = {
    profile: (req, res) => {
        res.render("reminder/profile-edit", { user: req.user })
    },
    updateUser: async (req, res) => {
        console.log("req.body:-------------", req.body)
        // try {
            const userChanges = Object.keys(req.body)
            userChanges.forEach( async (change) => {
                try {
                    await userModel.updateUser(change, req)
                    res.redirect("/reminders")
                } catch (err) {
                    console.log("as profilecontroller i recieved the error", err)
                    errorManagement.accountError(res, err)
        
                }
            })

    }

}

module.exports = profileController;