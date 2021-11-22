
const { session } = require("passport");
const { userModel } = require("../models/userModel");
const { passport } = require("../middleware/passport")

let adminController = {
    dashboard: (req, res, store) => {
        (req.sessionStore.all((err, sessions) => { 
            console.log(req)
            const finalSessionList = []
            for (let [sessionId, value] of Object.entries(sessions)) {
                finalSessionList.push({id: sessionId, userId: value.passport.user})
            }
            console.log(finalSessionList)
            let session_list = finalSessionList
            if (req.user.role == 'admin') {
            res.render("admin/dashboard", { sessions: session_list, name: req.user.name} )
            } else {
            res.redirect("/not_admin")
            }
        }))
    },

    revoke_session: (req, res) => {
        (req.sessionStore.all((err, sessions) => {
            let session1 = req.params.id;
            console.log("session info-----", req.session)
            console.log("found session", sessions.session)
            res.redirect("/admin")
        }))
    },

}

module.exports = adminController;