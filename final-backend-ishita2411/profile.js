const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const connectionString =
  "mongodb+srv://ishita:Kashish2210@socialmediacluster.88mctnm.mongodb.net/?retryWrites=true&w=majority";
const detailsTable = require("./src/detailsTable");
const Details = mongoose.model("details", detailsTable);
let username = "";
let profile = {};

function getprofile(req, res, next) {
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
  } else {
    res.status(401);
    res.json({ message: "user doesn't exist" });
  }
}

const getHeadline = (req, res) => {
  let user = req.params.user;
  if (user) {
    if (username == user) {
      res.send({
        username: profile["username"],
        headline: profile["headline"],
      });
    } else {
      res.send("wrong username");
    }
  } else {
    res.send({ username: profile["username"], headline: profile["headline"] });
  }
};

const getUserName = (req, res) => {
  res.send({ username: profile["username"], profile: profile});
};

const updateHeadline = (req, res) => {
  const newHeadline = req.body.headline;
  Details.updateOne(
    { username: username },
    { headline: newHeadline },
    (err, docs) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ username: username, headline: newHeadline });
      }
    }
  );
};

const getEmail = (req, res) => {
  let user = req.params.user;
  if (user) {
    if (username == user) {
      res.send({ username: profile["username"], email: profile["email"] });
    } else {
      res.send("wrong username");
    }
  } else {
    res.send({ username: profile["username"], email: profile["email"] });
  }
};

const updateEmail = (req, res) => {
  const email = req.body.email;
  Details.updateOne({ username: username }, { email: email }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ username: username, email: email });
    }
  });
};

const getDob = (req, res) => {
  let user = req.params.user;
  let dob = new Date(profile["dob"]);
  var milli = dob.getTime();
  if (user) {
    if (username === user) {
      res.send({ username: profile["username"], dob: milli });
    } else {
      res.send("requested date of birth for wrong username");
    }
  } else {
    res.send({ username: profile["username"], dob: milli });
  }
};

const getZip = (req, res) => {
  let user = req.params.user;
  if (user) {
    if (username == user) {
      res.send({ username: profile["username"], zipcode: profile["zipcode"] });
    } else {
      res.send("requested zipcode for wrong username");
    }
  } else {
    res.send({ username: profile["username"], zipcode: profile["zipcode"] });
  }
};

const updateZip = (req, res) => {
  const zipcode = req.body.zipcode;
  Details.updateOne({ username: username }, { zipcode: zipcode }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ username: username, zipcode: zipcode });
    }
  });
};

const getAvatar = (req, res) => {
  let user = req.params.user;
  if (user) {
    if (username == user) {
      res.send({ username: profile["username"], avatar: profile["avatar"] });
    } else {
      res.send("requested avatar for wrong username");
    }
  } else {
    res.send({ username: profile["username"], avatar: profile["avatar"] });
  }
};

const updateDob =(req,res) =>{
  const dob = req.body.dob;
  Details.updateOne({ username: username }, { dob: dob }, (err) => {
    if (err) {
      res.send({message: "error has occured"});
    } else {
      res.send({ username: username, dob:dob });
    }
  });

}

const updatePhone =(req,res) =>{
  const phone = req.body.phone;
  Details.updateOne({ username: username }, { phone: phone}, (err) => {
    if (err) {
      res.send({message: "error has occured"});
    } else {
      res.send({ username: username, phone: phone});
    }
  });

}

const updateAvatar = (req, res) => {
  const avatar =req.body.avatar
  Details.updateOne({ username: username }, { avatar: avatar }, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ username: username, avatar: avatar });
    }
  });
};

module.exports = (app) => {
  app.use(getprofile);
  app.get("/name", getUserName);
  app.get("/headline/:user?", getHeadline);
  app.put("/headline", updateHeadline);
  app.get("/email/:user?", getEmail);
  app.put("/email", updateEmail);
  app.put("/phone", updatePhone);

  app.get("/dob/:user?", getDob);
  app.put("/dob", updateDob);
  app.get("/zipcode/:user?", getZip);
  app.put("/zipcode", updateZip);
  app.get("/avatar/:user?", getAvatar);
  app.put("/avatar", updateAvatar);
};
