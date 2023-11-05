const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const connectionString =
  "mongodb+srv://ishita:Kashish2210@socialmediacluster.88mctnm.mongodb.net/?retryWrites=true&w=majority";
const articleTable = require("./src/articleTable");
const Article = mongoose.model("article", articleTable);
const detailsTable = require("./src/detailsTable");
const Details = mongoose.model("details", detailsTable);
const followerTable = require("./src/followerTable");
const Follow = mongoose.model("follow", followerTable);
let username = "";

function userArticles(req, res, next) {
  username = req.username;
  if (username) {
    (async () => {
      const connector = mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await connector.then(() => {
        next();
      });
    })();
  } else {
    res.status(401);
    res.json({ message: "user doesn't exist" });
  }
}

const postArticle = (req, res) => {
  const text = req.body.text;
  const title = req.body.title;
  const articleImage = req.body.articleImage;
  Article.find({}, (err, docs) => {
    if (err) {
      res.status(401);
      res.json({ message: err });
    } else {
      pid = docs.length;
      let arti = new Article({
        pid: pid + 1,
        author: username,
        title: title,
        text: text,
        date: new Date(),
        articleImage: articleImage,
      });
      arti.save(function (err, docs) {
        if (err) {
          res.status(401);
          res.json({ message: err });
        } else {
          Follow.find({username : username},(err,docs) =>{
            if(err){res.send({message: "error occured"})}
            else{
              var following = [username]
              for(var i=0;i<docs.length;i++){
                following.push(docs[i].follower)
              }
              
              Article.find({author:following},null, {sort: {date: -1}},(err,docs) =>{
                if(err){res.send({message: "error occured"})}
                else{
                  res.send({articles: docs})
                }
              })
            }
          })

        }
      });
    }
  });
};

const getArticle = (req, res) => {

  Follow.find({username : username},(err,docs) =>{
    if(err){res.send({message: "error occured"})}
    else{
      var following = [username]
      for(var i=0;i<docs.length;i++){
        following.push(docs[i].follower)
      }
      
      Article.find({author:following},null, {sort: {date: -1}},(err,docs) =>{
        if(err){res.send({message: "error occured"})}
        else{
          res.send({articles: docs})
        }
      })
    }
  })
};
// Follow.find({username : username},(err,docs) =>{
//   if(err){res.send({message: "error occured"})}
//   else{
//     var following = [username]
//     for(var i=0;i<docs.length;i++){
//       following.push(docs[i].follower)
//     }
//     
//     Article.find({author:following},(err,docs) =>{
//       if(err){res.send({message: "error occured"})}
//       else{
//         res.send({articles: docs})
//       }
//     })
//   }
// })

// let id = req.params.id;
// if (id) {
//   if (parseInt(id) || parseInt(id) == 0) {
//     Article.find({ pid: id }, (err, docs) => {
//       if (err) {
//         res.status(401);
//         res.json({ message: err });
//       } else {
//         if (docs.length != 0) {
//           res.send({ article: docs });
//         } else {
//           res.send("Article with this id not available");
//         }
//       }
//     });
//   } else {
//     Article.find({ author: id }, (err, docs) => {
//       if (err) {
//         res.status(401);
//         res.json({ message: err });
//       } else {
//         if (docs.length != 0) {
//           res.send({ article: docs });
//         } else {
//           res.send("This user articles are not available");
//         }
//       }
//     });
//   }
// } else {
//   Details.findOne({ username: username }, (err, docs) => {
//     if (err) {
//       res.status(401);
//       res.json({ message: err });
//     } else {
//       docs.following.push(username);
//       Article.find({ author: docs.following }, (err, docs) => {
//         if (err) {
//           res.status(401);
//           res.json({ message: err });
//         } else {
//           if (docs.length != 0) {
//             res.send({ article: docs });
//           } else {
//             res.send("You(loggedIn User) has no articles");
//           }
//         }
//       });
//     }
//   });
// }

const putArticle = (req, res) => {
  let id = req.params.id;
  const text = req.body.text;
  
  const commentId = req.body.commentId;
  console.log("in fetch", id,text, commentId)

  if (commentId) {
    Article.find({ pid: id }, (err, docs) => {
      if (err) {
        res.status(401);
        res.json({ message: err });
      } else { 
        // console.log(docs[0].comments.length) 
             
          if (commentId == -1) {
            const new_comment = {
              commentid:docs[0].comments.length+ 1,
              comment:text,
              username: username 
            }
            docs[0].comments.push(new_comment);
            Article.findOneAndUpdate(
              { pid: id },
              docs[0],
              { new: true },
              (err, docs) => {
                if (err) {
                  res.status(401);
                  res.json({ message: err });
                } else res.send({ article: docs });
              }
            );
          } else {      
            if(docs[0].comments[commentId - 1].username != username) {
              res.send({message: "you are not allowed to edit this comment"})
            }
            else{
              console.log(docs[0].comments[commentId - 1])
              docs[0].comments[commentId - 1].comment = text;
              console.log(docs[0])
              Article.findOneAndUpdate(
                { pid: id },
                docs[0],
                { new: true },
                (err, docs) => {
                  if (err) {
                    res.status(401);
                    res.json({ message: err });
                  } else 
                  {
                    console.log("update")
                    res.send({ article: docs });
                  }
                }
              );
            }  
          }
        
      }
    });
  } else {
    Article.find({ author: username, pid: id }, (err, docs) => {
      if (err) {
        res.status(401);
        res.json({ message: err });
      } else {
        if (docs.length == 0) {
          res.send({message:"You are not allowed to edit this post. You can edit only your posts"});
        } else {
          Article.findOneAndUpdate(
            { author: username, pid: id },
            { text: text },
            { new: true },
            (err, docs) => {
              // console.log(docs)
              if (err) {
                res.status(401);
                res.json({ message: err });
              } else {                
                res.send(docs);
              }
            }
          );
        }
      }
    });
  }
};

module.exports = (app) => {
  app.use(userArticles);
  app.post("/article", postArticle);
  app.get("/articles/:id?", getArticle);
  app.put("/articles/:id", putArticle);
};
