const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");

const loginHandler = async ( request, accessToken, refreshToken, profile, done ) => {
  let user = await User.findOne({ email: profile.email });

  if (!user) {
    user = await User.create({
      name: profile.displayName,
      email: profile.email,
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  }

  return done(null, user);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
      passReqToCallback: true,
    },
    loginHandler
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
