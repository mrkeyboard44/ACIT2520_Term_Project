import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = express()
app.use(express.json());


const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");



const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const passport = require("./middleware/passport");

require("dotenv").config()

declare module "express" {
    export interface Request {
        user: any
        session: any
    }
}


// create a user

// app.post("/users", async (req: Request, res: Response) => {
//     const { name, email } = req.body;
//     try {
//         const user = await prisma.user.create({
//             data: { name, email }
//         });
//         return res.json(user);
//     } catch (err) {
//         return res.status(400).json(err);
//     }
// })

// app.post("/register", async (req: Request, res: Response) => {
//         const { name, email, password, role} = req.body;
//         try {
//             const user = await prisma.user.create({
//                 data: { name, email, password, role }
//             });
//             res.redirect("/auth/login")
//             return res.json(user);
//         } catch (err) {
//             return res.status(400).json(err);
//         }
//     })

// app.get("/users", async (req: Request, res: Response) => {
//     try {
//         const users = await prisma.user.findMany({
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 role: true,
//                 reminders: true,
//                 posts: {
//                     select: {
//                         body: true,
//                         title: true
//                     }
//                 }
//             }
//         })
//         return res.json(users);
//     } catch (err) {
//         return res.status(500).json({ error: "something went wrong :("})
//     }
// })

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany()
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({ error: "something went wrong :("})
    }
})





// const multer = require("multer")
// const imgur = require("imgur")


// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, callback) => {
//     callback(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     )
//   }
// })

// const upload = multer({
//   storage: storage,
// })

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});


app.use("/", indexRoute);
app.use("/auth", authRoute);


app.listen(3001, () => {
    console.log( "Server running. Visit: localhost:3001/reminders in your browser 🚀" );
})