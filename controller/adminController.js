
const { session } = require("passport");
const { userModel } = require("../models/userModel");
const { passport } = require("../middleware/passport")

let adminController = {
    dashboard: (req, res, store) => {
        (req.sessionStore.all((err, sessions) => { 
            const finalSessionList = []
            for (let [sessionId, value] of Object.entries(sessions)) {
                finalSessionList.push({id: sessionId, userId: value.passport.user})
            }
            let session_list = finalSessionList
            res.render("admin/dashboard", { user: req.user, sessions: session_list, name: req.user.name} )
        }))
    },

    revoke_session: (req, res) => {
        req.sessionStore.destroy(req.params.id, () => {
            res.redirect('/admin')
        })
    },
    
}

module.exports = adminController;