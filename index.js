const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const ejsLayouts = require("express-ejs-layouts");
const { PrismaClient } = require(".prisma/client");
const prisma = new PrismaClient();
const multer = require("multer")

require("dotenv").config()

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads")
  },
  filename: (req, file, callback) => {
    console.log("file downloaded to server")
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

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

const authRoute = require("./routes/authRoute");
const passport = require("./middleware/passport");
const indexRoute = require("./routes/indexRoute");

app.use(express.json());
app.use(ejsLayouts);
app.use(upload.any())
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
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

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
