const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;


const port = process.env.PORT || 8080;

const dbConnect = require("./utils/dbConnect");

const { auth } = require("./middlewares/auth.middleware");
const authRoute = require("./routes/auth.route");
const letterRoute = require("./routes/letter.route");
require("./services/passportAuth"); // google auth configuration

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Welcome to the API",
  });
});

app.use("/auth", authRoute);
app.use("/letter", letterRoute);

app.listen(port, () => {
  console.log(`[INFO] Server is running on port ${port}`);
  dbConnect();
});
