const mongoose = require("mongoose");
const md5 = require("md5");
const connectionString =
  "mongodb+srv://ishita:Kashish2210@socialmediacluster.88mctnm.mongodb.net/?retryWrites=true&w=majority";
const cookieParser = require("cookie-parser");

const userTable = require("./src/userTable");
const User = mongoose.model("user", userTable);
const detailsTable = require("./src/detailsTable");
const Details = mongoose.model("details", detailsTable);
let sessionUser = {};
let cookieKey = "sid";

function register(req, res) {
  let username = req.body.username;
  // let headline = req.body.headline;
  let email = req.body.email;
  let zipcode = req.body.zipcode;
  let dob = req.body.dob;
  let phone = req.body.phone
  let password = req.body.password;

  let random_salt = username + "salt";
  let pwd_hash = md5(random_salt + password);
  (async () => {
    const connector = mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // var createdTime = new Date().getTime();

    let user = new User({
      username: username,
      password: pwd_hash,
    });

    let details = new Details({
      username: username,
      phone: phone,
      email: email,
      zipcode: zipcode,
      dob: dob,
    });

    await connector.then(() => {
      User.findOne({ username: username }, (err, docs) => {
        if (err) {
          res.status(401);
          res.json({ message: err });
        } else {
          if (docs) {
            res.send("Cannot register since user already present");
          } else {
            user.save();
            details.save();
            res.send({ result: "success", username: username });
          }
        }
      });
    });
  })();
}

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  let random_salt = username + "salt";
  let pwd_hash = md5(random_salt + password);

  (async () => {
    const connector = mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await connector.then(() => {
      let random_salt = username + "salt";
      let pwd_hash = md5(random_salt + password);

      User.findOne({ username: username, password: pwd_hash }, (err, docs) => {
        if (err) {
          res.status(401);
          res.json({ message: err });
        } else {
          if (docs) {
            let userDetails = docs;

            let sid = md5("salt" + new Date().getTime() + username);

            res.cookie(cookieKey, sid, {
              maxAge: 3600 * 1000,
              httpOnly: true,
              sameSite: "None",
              secure: true,
            });
            // console.log(sid)

            sessionUser[sid] = username;
            Details.findOne({ username: username }, (err, docs) => {
              if (err) {
                res.status(401);
                res.json({ message: err });
              } else {
                if (docs) {
                  res.send({
                    username: username,
                    result: "success",
                    headline: docs.headline,
                    email: docs.email,
                    zipcode: docs.zipcode,
                    dob: docs.dob,
                    following: docs.following,
                  });
                }
              }
            });
            // let msg = { username: username, result: "success" };

            // res.send(msg);
          } else {
            res.send({ result: "fail" });
          }
        }
      });
    });
  })();
}
function isLoggedIn(req, res, next) {
 
  if (!req.cookies) {
    return res.sendStatus(401);
  }
  if (req.isAuthenticated()) {
    req.username = req.user.name;
    // console.log("Authenticated: ", req.isAuthenticated())
    next();
  } else {
    let sid = req.cookies[cookieKey];
    // console.log("cookie",sid)

    // no sid for cookie key
    if (!sid) {
      return res.send({ return: "Unauthorized Activity" });
    }

    let username = sessionUser[sid];
    if (username) {
      req.username = username;
      next();
    } else {
      return res.send({ return: "Unauthorized Activity" });
    }
  }
}

const logout = (req, res) => {

  // if (!req.cookies) return res.sendStatus(401);
  // let sid = req.cookies[cookieKey];
  if (!req.cookies) return res.send({ return: "Unauthorized Activity" });
  // console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    req.logout(function(err){
      if(err){return next(err)}
    })
  }
  // console.log("after logout", req.isAuthenticated())
  res.clearCookie(cookieKey);
  // delete sessionUser(sid);
  res.send({ return: "OK" });
  res.end();
};
const putPassword = (req, res) => {
  username = req.username;

  const newPassword = req.body.password;
  let random_salt = username + "salt";
  let pwd_hash = md5(random_salt + newPassword);

  User.updateOne(
    { username: username },
    { password: pwd_hash },
    (err, docs) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ username: username, result: "success" });
      }
    }
  );
};

module.exports = (app) => {
  app.post("/register", register);
  app.post("/login", login);
  app.use(cookieParser());
  app.use(isLoggedIn);
  app.put("/logout", logout);
  app.put("/password", putPassword);
};
