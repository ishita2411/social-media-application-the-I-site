const profile = require("./profile");
const articles = require("./articles");
const following = require("./following");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://ishita:Kashish2210@socialmediacluster.88mctnm.mongodb.net/?retryWrites=true&w=majority";

const userTable = require("./src/userTable");
const User = mongoose.model("user", userTable);
const detailsTable = require("./src/detailsTable");
const Details = mongoose.model("details", detailsTable);

const auth = require("./auth");
const corsOptions = { origin: "http://localhost:3000", credentials: true };

app.use(express.json());
app.use(cors(corsOptions));
app.use(
  session({
    secret: "doNotGuessTheSecret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const GOOGLE_CLIENT_ID =
  "47356761412-mm9dogbdiqq6ock0e2anb1enlsq5v0mi.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile)
      let user = {
        email: profile.emails[0].value,
        name: profile.name.givenName + " " + profile.name.familyName,
        id: profile.id,
        token: accessToken,
      };
      (async () => {
        const connector = mongoose.connect(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        // var createdTime = new Date().getTime();

        let curr_user = new User({
          username: user.name,
        });

        let details = new Details({
          username: user.name,
          email: user.email,
          zipcode: "19204",
        });

        await connector.then(() => {
          let myid = Math.random() * 1000000;
          User.findOne({ username: user.name }, (err, docs) => {
            if (err) {
              res.status(401);
              res.json({ message: err });
            } else {
              if (!docs) {
                curr_user.save();
                details.save();
              }
            }
          });
        });
        return done(null, user);
      })();
    }
  )
);
// Redirect the user to Google for authentication.  When complete,
// Google will redirect the user back to the application at
//     /auth/google/callback
// app.get('/auth/google', passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })); // could have a passport auth second arg {scope: 'email'}
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/main",
    failureRedirect: "http://localhost:3000/",
  })
);

auth(app);
profile(app);
articles(app);
following(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
