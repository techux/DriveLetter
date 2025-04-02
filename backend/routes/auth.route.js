const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

const frontend_url = process.env.FRONTEND_URL;

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/drive.file"
    ],
  })
);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/dashboard",
//     failureRedirect: "/",
//   })
// );

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return res.redirect(
        `${frontend_url}/login?error=${encodeURIComponent(err)}`
      );
    }

    if (!user) {
      return res.redirect(
        `${frontend_url}/login?error=${encodeURIComponent(
          "Authentication Failed: " + info
        )}`
      );
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.redirect(
          `${frontend_url}/login?error=${encodeURIComponent(
            "Login Error: " + err
          )}`
        );
      }

      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.redirect(`${frontend_url}/login?token=${token}`);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => { 
    if (err) {
      return res.status(500).json({ error: "Logout failed", details: err });
    }
    return res.json({ message: "Logged out successfully" });
  });
});


router.get("/user", (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Unauthorized" });
  res.json(req.user);
});

module.exports = router;
