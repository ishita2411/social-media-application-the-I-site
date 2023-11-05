const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const connectionString =
  "mongodb+srv://ishita:Kashish2210@socialmediacluster.88mctnm.mongodb.net/?retryWrites=true&w=majority";
const detailsTable = require("./src/detailsTable");
const Details = mongoose.model("details", detailsTable);
const userTable = require("./src/userTable");
const User = mongoose.model("user", userTable);
const followerTable = require("./src/followerTable");
const Follow = mongoose.model("follow", followerTable);
let username = "";
let profile = {};

function userDetails(req, res, next) {
  username = req.username;
  if (username) {
    (async () => {
      const connector = mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await connector.then(() => {
        Details.findOne({ username: username }, (err, docs) => {
          if (err) {
            res.status(401);
            res.json({ message: err });
          } else {
            if (docs) {
              profile = docs;
              next();
            }
          }
        });
      });
    })();
  }
}

const getFollowing = (req, res) => {
  let user = req.params.user;
  Follow.find({ username: username }, (err, docs) => {
    if (err) {
      res.send({ message: "error has occured" });
    } else {
      res.send({
        following: docs,
      });
    }
  });
};

const addFollower = (req, res) => {
  let user = req.params.user;
  if (user == req.username) {
    res.send({ message: "User cannot be its own friend" });
  } else {
    User.findOne({ username: user }, (err, docs) => {
      if (err) {
        res.status(401);
        res.json({ message: err });
      } else {
        if (!docs)
          res.send({
            message: "Cannot be added as follower since user not registered",
          });
        else {
          Follow.findOne(
            { username: req.username, follower: user },
            (err, docs) => {
              if (err) {
                res.status(401);
                res.json({ message: err });
              } else {
                if (docs) {
                  res.send({ message: "already a follower" });
                } else {
                  let follow = new Follow({
                    username: username,
                    follower: user,
                  });
                  follow.save(function (err, docs) {
                    Follow.find({ username: username }, (err, docs) => {
                      if (err) {
                        res.send({ message: "error has occured" });
                      } else {
                        res.send({
                          following: docs,
                        });
                      }
                    });
                  });
                }
              }
            }
          );
        }
      }
    });
  }
};

const removeFollower = (req, res) => {
  let user = req.params.user;
  Follow.findByIdAndDelete(user, (err, docs) => {
    if (err) {
      res.send({ message: "error has occured" });
    } else {
      Follow.find({ username, username }, (err, docs) => {
        if (err) {
          res.send({ message: "error has occured" });
        } else {
          res.send({ following: docs });
        }
      });
    }
  });
};
module.exports = (app) => {
  app.use(userDetails);
  app.get("/following/:user?", getFollowing);
  app.put("/following/:user", addFollower);
  app.delete("/following/:user", removeFollower);
};
