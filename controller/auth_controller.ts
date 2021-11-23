import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const { database } = require("../models/userDatabase");
import session from "express-session"


let authController = {
  login: async (req: Request, res: Response) => {
    res.render("auth/login");
  },

  register: async (req: Request, res: Response) => {
    res.render("auth/register");
  },

  loginSubmit: async (req: Request, res: Response) => {
    console.log("Request sent")//Get this line of code to work somehow
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/auth/login",
    })
  },

  registerSubmit: async (req: Request, res: Response) => {
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
  },
  logout: (req: Request, res: Response) => {
    res.session.destroy();
    res.redirect("/auth/login");
  },

  githubLogin: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('github', {scope: ['user:email']})(req, res, next)
  },
  gitback: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('github', {failureRedirect: '/auth/login', successRedirect: "/reminders"})(req, res, next)
  },
};

module.exports = authController;
