// passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongoose = require("mongoose");
const Member = require("../models/member.model");

passport.use(
  new GoogleStrategy(
    {
      passReqToCallback: true,
      clientID:
        "1082340648416-idnf3iv17bnh4sg2eg2p7j7eucqmmgtc.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const newUser = {
        memberName: profile.emails[0].value,
        name: profile.displayName,
        isAdmin: false,
        password: "123",
        yob: 2000,
      };
      try {
        let user = await Member.findOne({
          memberName: profile.emails[0].value,
        });

        if (user) {
          done(null, user);
        } else {
          user = await Member.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Member.findOne({ _id: id.trim() }).then((user) => {
    done(null, user);
  });
});
