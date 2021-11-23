import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { database } = require("../models/userDatabase");
const authController = require("../controller/auth_controller");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
  })
);

router.get("/register", (req, res) => res.render("auth/register"))




router.post("/register", async (req: Request, res: Response) => {
    const { name, email, password, role} = req.body;
    try {
        const user = await prisma.user.create({
            data: { "name":"test", email, password, "role":"user" }
        });
        res.redirect("/auth/login")
        // return res.json(user);
    } catch (err) {
        return res.status(400).json(err);
    }
})

module.exports = router;
